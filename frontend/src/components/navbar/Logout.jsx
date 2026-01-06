import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import axiosInstance from "../../services/api.js";
import { setAuthUser } from "../../store/userSlice.js";
import { setSelectedUser } from "../../store/messageSlice.js";

function Logout() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = async () => {
      try {
         const res = await axiosInstance.post(
            "/auth/logout",
            {},
            {
               withCredentials: true,
            }
         );

         dispatch(setAuthUser(null));
         dispatch(setSelectedUser(null));
         localStorage.removeItem("authUser");
         toast.success(res.data.message);
         navigate("/login");
      } catch (error) {
         toast.error("Logout failed");
      }
   };

   return (
      <button
         onClick={handleLogout}
         className="flex items-center gap-1 cursor-pointer backdrop-filter backdrop-blur-3xl bg-opacity-0 border border-red-900 text-white p-2 font-semibold rounded-md"
      >
         <IoIosLogOut className="text-2xl" />
         <span className="hidden md:block">LOGOUT</span>
      </button>
   );
}

export default Logout;
