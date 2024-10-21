import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    pageNum: 1,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.pageNum = action.payload;
        },
    },
});

export default navigationSlice.reducer;
export const { setPage } = navigationSlice.actions;
