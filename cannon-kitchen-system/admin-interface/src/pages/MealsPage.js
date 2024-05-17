import { Flex } from "@chakra-ui/react";
import MealsPageTopBar from "../components/meals page/MealsPageTopBar";
import Days from "../components/meals page/Days";



export default function MealsPage() {
    return (
        <Flex direction = 'column' align ='center' flex = {1}>
            <MealsPageTopBar/>
            <Days/>
        </Flex>
    )
}