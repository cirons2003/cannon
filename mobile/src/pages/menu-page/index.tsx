import { Button, Flex, Text } from "native-base";
import { useAuth } from "../../custom hooks/useAuth";


export default function MenuPage() {
    const {logout} = useAuth();
    return (
        <Flex safeAreaTop bg = 'background' flex = {1}>
            <Flex flex = {1} > Menu</Flex>
        </Flex>
    );
}