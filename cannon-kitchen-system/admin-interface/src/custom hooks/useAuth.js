import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
    const serverURL = useSelector(state=> state.proxy.serverURL)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async(username, password) => {
        try {
            const response = await axios.post(serverURL+'/adminAuth/login', {username: username, password: password}, {withCredentials: true})
            dispatch(setUser({username: username}))
            localStorage.setItem('user', JSON.stringify({username: username}))
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }  
    }

    const logout = async() => {
        try {
            const response = await axios.get(serverURL+'/adminAuth/logout', {withCredentials: true})
            dispatch(setUser(null))
            localStorage.removeItem('user')
            navigate('/login')
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    return {login, logout}
}