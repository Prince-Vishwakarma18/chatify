import React from "react";
import SendMsg from "./SendMsg";
import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";
import { IoArrowBackOutline } from "react-icons/io5";
import { setSelectedUser } from "../../store/messageSlice";
import { useNavigate } from "react-router-dom";

function MessageCntr() {
   useGetMessages();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { onlineUsers } = useSelector((state) => state.user);
   const { selectedUser } = useSelector((state) => state.messages);

   if (!selectedUser) {
      return null;
   }

   const isOnline = onlineUsers?.includes(selectedUser?._id); // if selected userId include in online userss ,then user is online

   return (
      <div className="w-full h-full flex flex-col">

         <div className="w-full flex items-center px-2 py-2  rounded-md bg-clip-padding bg-black/35 ">
            {/* BACK BTN */}
            <button
               onClick={() => {
                  dispatch(setSelectedUser(null));
                  navigate("/home")
               }}
               className="text-xl mr-2 md:hidden"
            >
               <IoArrowBackOutline />
            </button>
            {/*header */}
            <div className="avatar">
               <div className="w-10 sm:w-12 md:w-12 rounded-full">
                  <img src={selectedUser.profilePic} />
               </div>
            </div>

            <div className="ml-2">
               <h1 className="font-semibold uppercase text-white text-xs sm:text-sm md:text-base lg:text-lg">
                  {selectedUser.username}
               </h1>
               <p className="text-xs text-white sm:text-sm">
                  {isOnline ? " online" : " offline"}
               </p>
            </div>
         </div>

         {/* Message Box*/}
         <div className="flex-1 overflow-y-scroll scrollbar-none">
            <MessageBox />
         </div>

         {/* Send Message */}
         <SendMsg />
      </div>
   );
}

export default MessageCntr;
