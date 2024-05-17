    import { Flex, SimpleGrid } from "@chakra-ui/react";
    import MealCard from "./MealCard";


    export default function LibraryItems({listOfMenuItems, openPopup, openEditModal}) {
        return (
            <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4, xl: 5 }} spacing = {6} overflow='auto'>
                {(listOfMenuItems && Array.isArray(listOfMenuItems)) && listOfMenuItems.map((item,i)=>(
                    <MealCard openEditModal = {openEditModal} key = {i} num = {i} item = {item}/>
                ))}
            </SimpleGrid>
        )
    }