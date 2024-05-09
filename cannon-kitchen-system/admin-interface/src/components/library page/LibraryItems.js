    import { Flex, SimpleGrid } from "@chakra-ui/react";
    import MealCard from "./MealCard";


    export default function LibraryItems({listOfMenuItems, openPopup, openEditModal}) {
        return (
            <SimpleGrid columns = {5} spacing = {4} overflow = 'auto' wrap = 'wrap' width = '100%' justify = 'space-around'>
                {(listOfMenuItems && Array.isArray(listOfMenuItems)) && listOfMenuItems.map((item,i)=>(
                    <MealCard openEditModal = {openEditModal} key = {i} num = {i} item = {item}/>
                ))}
            </SimpleGrid>
        )
    }