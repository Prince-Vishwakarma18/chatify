import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../../hooks/useGetOtherUser";
import { useSelector } from "react-redux";

function Sidebar() {
   useGetOtherUsers();
   const { otherUsers, onlineUsers, searchQuery } = useSelector(
      (state) => state.user
   );

   const filteredUsers = (otherUsers || []).filter((user) =>
      user.username
         ?.toLowerCase()
         .includes((searchQuery || "").trim().toLowerCase())
   );

   const online = filteredUsers.filter((user) =>
      onlineUsers?.includes(user._id)
   );
   const offline = filteredUsers.filter(
      (user) => !onlineUsers?.includes(user._id)
   );

   const sortedUsers = [...online, ...offline];

   if (!otherUsers || otherUsers.length === 0) {
      return (
         <div
            className="
                flex flex-col items-center justify-center h-full
                w-full md:w-20 lg:min-w-[250px]
                border-r border-white/35
            "
         >
            <span className="loading loading-spinner"></span>
         </div>
      );
   }

   return (
      <div
         className="
                flex flex-col h-full border-r border-white/35
                lg:min-w-[250px]
                bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0
            "
      >
         <div className="flex-1 overflow-y-auto scrollbar-none">
            {sortedUsers.length > 0 ? (
               sortedUsers.map((user) => (
                  <OtherUser key={user._id} user={user} />
               ))
            ) : (
               <p className="text-center text-gray-500 mt-5">No users found</p>
            )}
         </div>
      </div>
   );
}

export default Sidebar;
