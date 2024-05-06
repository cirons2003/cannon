import axios from 'axios'
import { useState } from 'react'



const useMemberLogin = () => {
    const [email, setEmail] = useState()
    const [secretMessage, setSecretMessage] = useState('')

    const register = async(email, password, firstName, lastName) => {
        try {
            const response = await axios.post('http://localhost:5000/memberAuth/register', {email: email, password: password, first_name: firstName, last_name: lastName}, {withCredentials: true})
            console.log(response.data)
            setEmail(response.data.email)
            localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
        }catch(err) {
            console.error(err)
        }
    }

    const login = async(email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/memberAuth/login', {email:email, password: password}, {withCredentials: true})
            console.log(response.data)
            setEmail(response.data.email)
            localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
        }catch(err) {
            console.error(err)
        }
    }

    const logout = () => {
        setEmail('')
        localStorage.removeItem('access_token')
    }

    const secret = async() => {
        try {
            const response = await axios.get('http://localhost:5000/memberAuth/secret')
            setSecretMessage(response.data.message)
        }catch(err) {
            console.error(err)
            setSecretMessage('')
        }
        
    }

    return {login, register, logout, email, secretMessage, secret, setSecretMessage}
}



export default useMemberLogin