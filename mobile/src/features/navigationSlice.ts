import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import PagerView from 'react-native-pager-view';
import { useRef } from 'react';

type NavigationState = {
    pageNum: number;
};

const initialState = {
    pageNum: 0,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setPage: ((state, action: PayloadAction<number>) => {
            state.pageNum = action.payload;
        })
    }
});

export default navigationSlice.reducer;
export const { setPage } = navigationSlice.actions;