import {createSlice} from '@reduxjs/toolkit'


const getUserState = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export const userSlice = createSlice({
    name: 'user', 
    initialState: getUserState(),
    reducers: {
        setUser: (_, action) => {
            return action.payload
        } 
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer