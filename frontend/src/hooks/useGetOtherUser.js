import axiosInstance from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../store/userSlice";
import { useEffect } from "react";

const useGetOtherUsers = () => {
   const dispatch = useDispatch();
   const authUser = useSelector((state) => state.user);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const res = await axiosInstance.get("/messages/users", {
               withCredentials: true,
            });
            dispatch(setOtherUsers(res.data.users));
         } catch (error) {
            console.log("Error in fetching other users", error);
         }
      };

      fetchUsers();
   }, [authUser?._id]); // fetched users for sidebar when authUser login
};

export default useGetOtherUsers;
