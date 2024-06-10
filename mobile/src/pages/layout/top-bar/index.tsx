import { Flex, Icon, IconButton, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../../../custom hooks/useAuth";


export default function TopBar() {
    const { logout } = useAuth();
    return (
        <Flex width='full' height='60px' align='center' direction='row' justify='space-around' bg='background'>
            <Text fontFamily='primary' fontSize='lg' color='primary'>Cannon Dial Elm</Text>
            <IconButton onPress={logout} borderRadius='full' icon={<Icon as={MaterialIcons} size='xl' color='danger' name='logout' />} />
        </Flex>
    );
};  