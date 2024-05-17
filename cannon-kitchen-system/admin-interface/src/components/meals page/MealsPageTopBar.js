import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";



export default function MealsPageTopBar() {
    const colors = useSelector(state => state.theme.colors)
    return (
        <Flex width = '100%' p = '5px' justify = 'space-between' align = 'center' mb = '10px' wrap = 'wrap'>
            <Text as = 'b' color = {colors.secondary} fontSize = '30px'>Meals</Text>
        </Flex>
    )
}