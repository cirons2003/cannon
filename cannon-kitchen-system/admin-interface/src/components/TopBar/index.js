import { Flex, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {useAuth} from '../../custom hooks/useAuth'
import DeleteConfirmation from '../DeleteConfirmation'
import {useState} from 'react'

export default function TopBar() {
    const colors = useSelector(state => state.theme.colors)
    const orgname = useSelector(state => state.theme.organization.name)
    const {logout} = useAuth()
    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <Flex width = '100%' height = '70px' bg = {colors.primary} align = 'center' justify = 'space-between' >
            <Text  fontSize = '30px' as = 'b' color = {colors.secondary}>{orgname}</Text>
            <Button variant = 'text' mr = '100px' fontWeight = 'bold' color = {colors.secondary} fontSize = '20px' onClick = {()=> setConfirmOpen(true)}>Log Out</Button>
            <DeleteConfirmation header = 'Logout?' body = 'Click Confirm to Continue...' logout = {true} isOpen = {confirmOpen} onClose = {()=>setConfirmOpen(false)} onDelete = {()=>{setConfirmOpen(false); logout()}}/>
        </Flex>
    )
}