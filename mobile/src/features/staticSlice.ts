import { createSlice } from "@reduxjs/toolkit";

type StaticState = {
    baseURL: string;
};

const initialState: StaticState = {
    baseURL: 'http://localhost:5000',//https://cannon-server.onrender.com',
};

const staticSlice = createSlice({
    name: 'static',
    initialState: initialState,
    reducers: {}
});

export default staticSlice.reducer;
