import { Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";


export default function LibraryTopBar({openModal, searchTerm, setSearchTerm}) {
    const colors = useSelector(state => state.theme.colors)

    return (
        <Flex width = '100%' mb = '10px' p = '5px' justify = 'space-between' >
            <Text color = {colors.secondary} as = 'b' fontSize = '30px'>Menu Item Library </Text>
            <Flex gap = {2} align = 'center'>
                <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
                <Button bg = {colors.secondary} color = {colors.primary} onClick = {openModal}>Add New Item + </Button>
            </Flex>
        </Flex>
    )
}