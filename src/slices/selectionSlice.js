import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    selectedSection: "CHATS",
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
        },
    }
})

export const { setSelectedUser, setSelectedSection } = selectionSlice.actions;
export default selectionSlice.reducer;