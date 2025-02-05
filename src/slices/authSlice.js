import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        updateChatHistory: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    chatHistory: [...new Set([...(state.user.chatHistory || []), action.payload])]
                };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    }
})

export const { setUser, setLoading, updateChatHistory } = authSlice.actions;
export default authSlice.reducer;