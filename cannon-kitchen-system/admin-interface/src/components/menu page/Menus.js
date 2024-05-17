import { SimpleGrid, list } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import MenuCard from "./MenuCard";



export default function Menus({listOfMenus, openEditModal, removeMenu, startAddingItems, removeItemFromMenu}) {
    const colors = useSelector(state => state.theme.colors)


    return (
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4}} spacing = {6} overflow='auto'>
            {listOfMenus?.map((menu, i)=> (
                <MenuCard removeItemFromMenu = {removeItemFromMenu} startAddingItems = {startAddingItems} removeMenu = {removeMenu} key = {i} num = {i} menu = {menu} openEditModal = {openEditModal}/>
            ))}     
        </SimpleGrid>
    )
}