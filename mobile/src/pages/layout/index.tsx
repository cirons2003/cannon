import { Flex, Icon, Text, theme } from "native-base";
import TopBar from "./top-bar";
import HorizontalNavigator from "./horizontal-navigator";
import BottomBar from "./bottom-bar";
import useStartup from "../../custom hooks/useStartup";
import { useEffect } from "react";
import { useAppSelector } from "../../custom hooks/hooks";
import { MaterialIcons } from '@expo/vector-icons';
import { NoConnectionWrapper } from "../../components/no-connection-wrapper";
import { Loading } from "../../components/loading";


export default function Layout() {
    const { passToken } = useStartup();
    const accessToken = useAppSelector(state => state.user.accessToken);
    const confirmingToken = useAppSelector(state => state.validation.confirmingToken);

    useEffect(() => {
        if (accessToken) {
            passToken(accessToken);
        }
    }, [accessToken])

    return (
        <>
            {confirmingToken === false ?
                <Flex flex={1} safeAreaTop bg='background'>
                    <NoConnectionWrapper>
                        <Flex flex={1}>
                            <TopBar />
                            <HorizontalNavigator />
                            <BottomBar />
                        </Flex>
                    </NoConnectionWrapper>
                </Flex>
            :
                <Loading loadingMessage="Starting up"/>
            }
        </>
    );
};