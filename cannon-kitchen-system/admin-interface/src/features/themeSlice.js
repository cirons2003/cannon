import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme', 
    initialState: {
        colors: {
            primary: '#09552E',
            secondary: '#1AC16B',
            white: '#FFFFFF', 
            black: '#000000',
            grey: '#767B79',
            red: '#E92E26'
        }, 
        organization: {
            name: 'Cannon Dial Elm'
        }
    }, 
    reducers: {
        setPrimaryColor: (state, action) => {
            state.colors.primary = action.payload
        },
        setSecondaryColor: (state, action) => {
            state.colors.secondary = action.payload
        }
    }
})

export const {setPrimaryColor, setSecondaryColor} = themeSlice.actions
export default themeSlice.reducer