import { useEffect } from "react";
import axiosInstance from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/messageSlice";

const useGetMessages = () => {
   const dispatch = useDispatch();

   const { selectedUser } = useSelector((state) => state.messages);

   useEffect(() => {
      if (!selectedUser?._id) return;

      const fetchMessages = async () => {
         try {
            const res = await axiosInstance.get(
               `/messages/${selectedUser._id}`,
               { withCredentials: true }
            );

            dispatch(setMessages(res.data.messages));
         } catch (error) {
            console.error("Error fetching messages:", error);
         }
      };

      fetchMessages();
   }, [selectedUser, dispatch]);
};

export default useGetMessages;
