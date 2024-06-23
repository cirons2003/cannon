import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Button, Flex, Icon, Text, theme } from "native-base";
import { ReactNode } from 'react';
import { useCheckConnection } from "../../custom hooks/useCheckConnection";
import { useAppSelector } from "../../custom hooks/hooks";
import { Loading } from "../loading";

type NoConnectionWrapperProps = {
    children: ReactNode;
};

export const NoConnectionWrapper: React.FC<NoConnectionWrapperProps> = ({ children }) => {
    const { loading, checkConnection } = useCheckConnection();
    const connected = useAppSelector(state => state.validation.connected);

    return (
        <>
            {connected ?
                children
                :
                <>
                    {!loading ?
                        <Flex flex={1} justify="center" align="center">
                            <Flex direction="column" align='center' textAlign='center' >
                                <Icon as={MaterialIcons} name='wifi-off' size={20} color='secondary' />
                                <Text mt='lg' bold color='secondary' fontFamily='primary' fontSize='lg'>No connection...</Text>
                            </Flex>
                            <Button mt='md' borderRadius='full' leftIcon={<SimpleLineIcons size={14} color={theme.colors.secondary} name='refresh' />} bg='white' _pressed={{ opacity: 70 }} onPress={checkConnection}>
                                <Text bold color='secondary' fontFamily='primary' fontSize='sm'>Refresh</Text>
                            </Button>
                        </Flex>
                        :
                        <Loading loadingMessage="Trying to connect"/>
                    }
                </>
            }
        </>
    );
};
