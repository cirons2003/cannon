import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import staticReducer from './features/staticSlice';
import navigationReducer from './features/navigationSlice';
import validationReducer from './features/validationSlice';
import dataReducer from './features/dataSlice';

export const store = configureStore({
    reducer: {
        static: staticReducer,
        user: userReducer,
        navigation: navigationReducer,
        validation: validationReducer,
        data: dataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;