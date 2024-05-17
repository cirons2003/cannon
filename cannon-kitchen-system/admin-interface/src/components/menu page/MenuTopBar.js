import { Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";


export default function MenuTopBar({searchTerm, setSearchTerm, openModal}) {
    const colors = useSelector(state => state.theme.colors)
    return (
        <Flex width = '100%' p = '5px' justify = 'space-between' align = 'center' mb = '10px' wrap = 'wrap'>
            <Text as = 'b' color = {colors.secondary} fontSize = '30px'>Menus </Text>
            <Flex wrap = 'wrap' gap = {2} align = 'center' >
                <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
                <Button bg = {colors.secondary} color = {colors.primary} onClick = {openModal}>Add New Menu + </Button>
            </Flex>
        </Flex>
    )
}