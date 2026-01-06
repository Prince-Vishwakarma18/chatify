import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
   const { authUser } = useSelector((state) => state.user);
   const { selectedUser } = useSelector((state) => state.messages);

   if (!message || !authUser) return null;

   const isSender =
      (message?.senderId?._id ?? message?.senderId) === authUser?._id;

   const messageEndRef = useRef(null);

   useEffect(() => {
      if (!messageEndRef.current) return;

      messageEndRef.current.scrollIntoView({
         behavior: "smooth",
         block: "end",
      });
   }, [message]);

   return (
      <div
         ref={messageEndRef}
         className="text-xs sm:text-sm md:text-base lg:text-lg px-1"
      >
         <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
            {/* AVATAR */}
            <div className="chat-image avatar">
               <div className="w-9 sm:w-10 rounded-full">
                  <img
                     alt="user avatar"
                     src={
                        isSender
                           ? authUser.profilePic ||
                           "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                           : selectedUser?.profilePic ||
                           "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                     }
                  />
               </div>
            </div>

            {/* MESSAGE */}
            <div
               className={`chat-bubble flex flex-col gap-1
                    ${isSender
                     ? "bg-blue-900 text-white"
                     : "bg-gray-800 text-white"
                  }`}
            >
               {message?.image && (
                  <img
                     src={message.image}
                     alt="chat media"
                     className="w-full max-w-[180px] rounded-md object-cover"
                  />
               )}

               {message?.message && <p>{message.message}</p>}
            </div>

            {/* TIME */}
            <div className="chat-footer mt-1">
               <time className="opacity-60">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                     hour: "2-digit",
                     minute: "2-digit",
                  })}
               </time>
            </div>
         </div>
      </div>
   );
}

export default Message;
