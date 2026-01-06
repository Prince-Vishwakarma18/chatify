import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: [],
        searchQuery:null,
        selectedUser:null,
        onlineUsers:[]
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUsers:(state,action) =>{
            state.otherUsers = action.payload;
        },
        setSearchQuery:(state,action) =>{
            state.searchQuery = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }

    },
});

export const {setAuthUser , setOtherUsers , setSearchQuery , setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;
