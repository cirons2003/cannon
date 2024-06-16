import { createSlice } from "@reduxjs/toolkit";

type StaticState = {
    baseURL: string;
};

const initialState: StaticState = {
    baseURL: 'https://giant-flies-brush.loca.lt',
};

const staticSlice = createSlice({
    name: 'static',
    initialState: initialState,
    reducers: {}
});

export default staticSlice.reducer;