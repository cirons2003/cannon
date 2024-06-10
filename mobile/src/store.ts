import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import staticReducer from './features/staticSlice';;
import navigationReducer from './features/navigationSlice'

export const store = configureStore({
    reducer: {
        static: staticReducer,
        user: userReducer,
        navigation: navigationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;