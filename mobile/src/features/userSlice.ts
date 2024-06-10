import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
    firstName?: string,
    lastName?: string,
    accessToken?: string,
    description?: string,
}

const initialState: UserState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        logout: (state) => {
            return {};
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        }
    },
});

export const { setUser, logout, setDescription } = userSlice.actions;
export default userSlice.reducer;