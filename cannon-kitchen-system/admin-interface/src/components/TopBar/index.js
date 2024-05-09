import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function TopBar() {
    const colors = useSelector(state => state.theme.colors)
    const orgname = useSelector(state => state.theme.organization.name)

    return (
        <Flex width = '100%' height = '70px' bg = {colors.primary} align = 'center' justify = 'space-between' >
            <Text  fontSize = '30px' as = 'b' color = {colors.secondary}>{orgname}</Text>
        </Flex>
    )
}