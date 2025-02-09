import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    selectedSection: localStorage.getItem("selectedSection") ? JSON.parse(localStorage.getItem("selectedSection")) : "CHATS",
}

const selectionSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSelectedSection: (state, action) => {
            state.selectedSection = action.payload;
            localStorage.setItem("selectedSection", JSON.stringify(action.payload))
        },
    }
})

export const { setSelectedUser, setSelectedSection } = selectionSlice.actions;
export default selectionSlice.reducer;