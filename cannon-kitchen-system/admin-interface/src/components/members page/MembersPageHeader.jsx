import { Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";


export default function MembersPageHeader({openModal, searchTerm, setSearchTerm}) {
    const colors = useSelector(state => state.theme.colors)

    return (
        <Flex width = '100%' mb = '10px' p = '5px' justify = 'space-between' wrap = 'wrap'>
            <Text color = {colors.secondary} as = 'b' fontSize = '30px'>Members </Text>
            <Flex gap = {2} align = 'center' wrap = 'wrap'>
                <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
                <Button bg = {colors.secondary} color = {colors.primary} onClick = {openModal}>Add New Member + </Button>
            </Flex>
        </Flex>
    )
}