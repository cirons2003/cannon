import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function ProtectedRoute({children}) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(()=> {
        const clear = setTimeout(()=>{
            if (!user) {
                navigate('/login')
            }
        },1000)
        return ()=> clearTimeout(clear)
    }, [user])

    return (
        <>
            {children}
        </>
    )
}