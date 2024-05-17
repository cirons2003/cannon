import { SimpleGrid } from "@chakra-ui/react";
import DayCard from "./DayCard";


export default function Days() {
    return (
        <SimpleGrid spacing = {4} wrap = 'wrap' columns = {{base: 1, sm: 1, md: 2, lg: 3, xl: 7}} width = '100%' flex = {1} pb = '100px'>
            {Array.from({length:7}).map((_,index) => (
                <DayCard key = {index} day = {index}/>
            ))}
        </SimpleGrid>
    )
}