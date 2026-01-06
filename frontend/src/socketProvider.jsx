import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "./services/socket.js";
import { setOnlineUsers } from "./store/userSlice.js";
import { addMessage } from "./store/messageSlice.js";

export default function SocketProvider({ children }) {
   const authUser = useSelector((state) => state.user.authUser);
   const dispatch = useDispatch();

   useEffect(() => {
      if (authUser?._id) {
         const socket = connectSocket(authUser._id);

         //  Online Users
         socket.on("getOnlineUsers", (users) => {
            console.log("Online User", users);
            dispatch(setOnlineUsers(users));
         });

         //  Real-Time Message
         socket.on("receive-message", (msg) => {
            dispatch(addMessage(msg));
         });

         return () => {
            socket.off("getOnlineUsers");
            socket.off("receive-message");
            disconnectSocket();
         };
      } else {
         disconnectSocket();
      }
   }, [authUser, dispatch]);

   return <>{children}</>;
}
