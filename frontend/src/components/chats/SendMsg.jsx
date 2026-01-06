import React, { useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { BsPaperclip } from "react-icons/bs";
import axiosInstance from "../../services/api.js";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messageSlice.js";

function SendMsg() {
   const dispatch = useDispatch();

   const [message, setMessage] = useState("");
   const [image, setImage] = useState(null);
   const [isSending, setIsSending] = useState(false);

   const inputRef = useRef(null);

   const { selectedUser } = useSelector((state) => state.messages);

   const handleImgSend = (e) => {
      const img = e.target.files[0];
      if (img) setImage(img);
   };

   const handleSendMsg = async (e) => {
      e.preventDefault();

      if (isSending) return;
      if (!selectedUser?._id) return;
      if (!message.trim() && !image) return;

      const formData = new FormData();
      if (message.trim()) formData.append("message", message);
      if (image) formData.append("image", image);

      try {
         setIsSending(true);

         const res = await axiosInstance.post(
            `/messages/send/${selectedUser._id}`,
            formData,
            {
               withCredentials: true,
               headers: { "Content-Type": "multipart/form-data" },
            }
         );

         dispatch(addMessage(res.data.newMessage));
         setMessage("");
         setImage(null);

         setTimeout(() => {
            inputRef.current?.focus();
         }, 0);

      } catch (error) {
         console.log("Error in send msg", error);
      } finally {
         setIsSending(false);
      }
   };

   return (
      <div className="w-full py-2 px-1">
         {/* IMAGE PREVIEW */}
         {image && (
            <div className="mb-2 relative inline-block">
               <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md"
               />
               <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center"
               >
                  ✕
               </button>
            </div>
         )}

         <form onSubmit={handleSendMsg} className="flex items-center gap-2">
            <label
               htmlFor="mediaInput"
               className="cursor-pointer text-2xl text-gray-400 hover:text-white"
            >
               <BsPaperclip />
            </label>

            <input
               id="mediaInput"
               type="file"
               accept="image/*"
               className="hidden"
               onChange={handleImgSend}
            />

            {/* MESSAGE INPUT */}
            <input
               ref={inputRef}
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               type="text"
               placeholder="Type a message..."
               className="flex-1 rounded-full bg-gray-800 text-white outline-none px-3 py-2 placeholder-gray-400"
            />

            {/* SEND BUTTON */}
            <button
               type="submit"
               disabled={isSending}
               className={`text-2xl transition ${isSending
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-blue-600 hover:text-blue-800"
                  }`}
            >
               <IoSend />
            </button>
         </form>
      </div>
   );
}

export default SendMsg;
