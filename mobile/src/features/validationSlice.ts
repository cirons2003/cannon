import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const validationSlice = createSlice({
    name: 'validation',
    initialState: {
        connected: true,
        confirmingToken: true,
    },
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setConfirmingToken: (state, action: PayloadAction<boolean>) => {
            state.confirmingToken = action.payload;
        }
    },
})

export const { setConnected, setConfirmingToken } = validationSlice.actions;
export default validationSlice.reducer;