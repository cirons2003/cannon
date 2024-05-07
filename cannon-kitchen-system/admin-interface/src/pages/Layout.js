import { Button, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useAuth } from "../custom hooks/useAuth"


export default function Layout() {
    const user = useSelector(state=>state.user)
    const {logout} = useAuth()

    return (
        <>  
            <Text>{user?.username ? user.username : 'no user signed in'}</Text>
            <Button onClick = {logout}>logout</Button>
        </>
    )
}