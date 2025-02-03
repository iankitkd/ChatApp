import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    chatMessages: [],
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setChatMessages: (state, action) => {
            state.chatMessages = action.payload;
        },
    }
})

export const { setSelectedUser, setChatMessages } = chatSlice.actions;
export default chatSlice.reducer;