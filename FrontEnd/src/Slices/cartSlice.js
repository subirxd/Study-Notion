import { createSlice } from "@reduxjs/toolkit";
import {ToastContainer} from "react-toastify";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value){
            state.totalItems = value.payload;
        },
    },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;