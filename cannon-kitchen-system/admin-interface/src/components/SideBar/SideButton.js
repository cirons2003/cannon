import { Button, Flex, IconButton, Text} from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'
import { useSelector } from "react-redux";

export default function SideButton({icon, text, to}) {
    const colors = useSelector(state => state.theme.colors)
    
    return (
        <Button 
            width = '100%' 
            display= 'flex' 
            justifyContent = 'start' 
            gap = {5} 
            align = 'center' 
            as = {RouterLink} 
            to = {to} 
            leftIcon = {icon}
            color = {colors.primary}
            bg = {colors.secondary}
            height = '50px'
            borderRadius={20}
        >
            <Text fontSize = '18px' as = 'b'>{text}</Text>
            <Flex></Flex>
        </Button>
    )
}