import { createSlice } from "@reduxjs/toolkit";

export const proxySlice = createSlice({
    name: 'proxy',
    initialState: {
        serverURL: 'http://localhost:5000'
    },
    reducers: {

    }
})

export default proxySlice.reducer