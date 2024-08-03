import { createSlice } from "@reduxjs/toolkit";

export const proxySlice = createSlice({
    name: 'proxy',
    initialState: {
        serverURL: 'https://cannon-server.onrender.com'
    },
    reducers: {

    }
})

export default proxySlice.reducer