import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
   name: "messages",
   initialState: {
      messages: [],
      selectedUser: null,
   },
   reducers: {
      setMessages: (state, action) => {
         state.messages = action.payload;
      },

      addMessage: (state, action) => {
         const msg = action.payload;
         if (
            state.selectedUser &&
            (msg.senderId === state.selectedUser._id ||
               msg.receiverId === state.selectedUser._id)
         ) {
            state.messages.push(msg);
         }
      },
      setSelectedUser: (state, action) => {
         state.selectedUser = action.payload;
      },
   },
});

export const { setMessages, addMessage, setSelectedUser } =
   messageSlice.actions;

export default messageSlice.reducer;
