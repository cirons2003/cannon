import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupedOrder } from "../custom hooks/useOrders";


const dataSlice = createSlice({
    name: 'data',
    initialState: {
        groupedOrders: [] as GroupedOrder[],
    },
    reducers: {
        setGroupedOrders: ((state, action: PayloadAction<GroupedOrder[]>) => {
            state.groupedOrders = action.payload;
        })
    }
});

export default dataSlice.reducer;
export const { setGroupedOrders } = dataSlice.actions;