import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import themeReducer from './features/themeSlice'
import proxyReducer from './features/proxySlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        proxy: proxyReducer,
    }
})