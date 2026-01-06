import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

function MessageBox() {
   const { messages } = useSelector((state) => state.messages);
   return (
      <div className="w-full flex flex-col gap-2">
         {messages.map((msg, index) => (
            <Message key={msg?._id || index} message={msg} />
         ))}
      </div>
   );
}

export default MessageBox;
