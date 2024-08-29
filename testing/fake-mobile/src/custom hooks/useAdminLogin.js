import axios from 'axios'
import { useState } from 'react'



const useAdminLogin = () => {
    const [username, setUsername] = useState()

    const register = async (username, password) => {
        try {
            const response = await axios.post('https://cannon-server.onrender.com/adminAuth/register', { username: username, password: password }, { withCredentials: true })
            console.log(response.data)
            setUsername(response.data.username)
        } catch (err) {
            console.error(err)
        }
    }

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/adminAuth/login', { username: username, password: password }, { withCredentials: true })
            console.log(response.data)
            setUsername(response.data.username)
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/adminAuth/logout', { withCredentials: true })
            console.log(response.data)
            setUsername('')
        } catch (err) {
            console.error(err)
        }
    }
    return { login, register, logout, username }
}



export default useAdminLogin