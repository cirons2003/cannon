import { Button, Flex, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useAuth } from "../custom hooks/useAuth"
import {Outlet} from 'react-router-dom'
import SideBar from "../components/SideBar/index"
import TopBar from "../components/TopBar/index"
import { useEffect } from "react"


export default function Layout() {
    const user = useSelector(state=>state.user)

    const {logout} = useAuth()


    return (
        <>
            <Flex width = '100vw' height = '100vh' direction = 'column'>
                <TopBar/>
                <Flex width = '100%' flex = {1} justify = 'start' overflow = 'hidden'>
                    <SideBar/>
                    <Flex flex = {1} overflowY = 'auto'>
                        <Outlet/>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )

    /*return (
        <>  
            <Text>{user?.username ? user.username : 'no user signed in'}</Text>
            <Button onClick = {logout}>logout</Button>
        </>
    )*/
}