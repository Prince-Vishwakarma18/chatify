import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/messageSlice";
import { useNavigate } from "react-router-dom";

function OtherUser({ user }) {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const { selectedUser } = useSelector((state) => state.messages);

   // Online users
   const { onlineUsers } = useSelector((state) => state.user);
   const isOnline = onlineUsers?.includes(user?._id);
   const isSelected = selectedUser?._id === user?._id;

   const handleSelectedUser = (user) => {
      // console.log(user);
      dispatch(setSelectedUser(user));
      navigate(`/home/chat/${user._id}`);
   };

   return (
      <div className="flex flex-col px-1 gap-1">
         <div
            onClick={() => handleSelectedUser(user)}
            className={`mt-1 flex items-center border-white/20 border-b p-2 rounded-xl transition-all duration-300 ease-out cursor-pointer 
          ${
             isSelected
                ? "bg-gray-600 scale-[1.02]"
                : "hover:bg-black/30 hover:backdrop-blur-md"
          }
        `}
         >
            {/* Avatar */}
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
               <div className="w-10 rounded-full">
                  <img
                     src={
                        user.profilePic ||
                        "https://avatar.iran.liara.run/public/boy?username=username"
                     }
                     alt="User Avatar"
                  />
               </div>
            </div>
            {/* Username */}
            <div>
               <h1 className=" ml-2 text-lg font-medium text-white block md:hidden lg:block whitespace-nowrap">
                  {user.username}
               </h1>
            </div>
         </div>
      </div>
   );
}

export default OtherUser;
