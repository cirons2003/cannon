import { Flex, Icon, Text, theme } from 'native-base';
import TopBar from './top-bar';
import HorizontalNavigator from './horizontal-navigator';
import BottomBar from './bottom-bar';
import useStartup from '../../custom hooks/useStartup';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../custom hooks/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { NoConnectionWrapper } from '../../components/no-connection-wrapper';
import { Loading } from '../../components/loading';
import PagerView from 'react-native-pager-view';

export default function Layout() {
    const { passToken } = useStartup();
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const confirmingToken = useAppSelector(
        (state) => state.validation.confirmingToken,
    );

    const pagerRef = useRef<PagerView>(null);

    useEffect(() => {
        if (accessToken) {
            passToken(accessToken);
        }
    }, [accessToken]);

    return (
        <>
            {confirmingToken === false ? (
                <Flex flex={1} safeAreaTop bg="background">
                    <NoConnectionWrapper>
                        <Flex flex={1}>
                            <TopBar />
                            <HorizontalNavigator pagerRef={pagerRef} />
                            <BottomBar pagerRef={pagerRef} />
                        </Flex>
                    </NoConnectionWrapper>
                </Flex>
            ) : (
                <Loading loadingMessage="Starting up" />
            )}
        </>
    );
}
