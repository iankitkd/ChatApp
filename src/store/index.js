import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice" 
import selectionReducer from "../slices/selectionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        selection: selectionReducer
    }
})