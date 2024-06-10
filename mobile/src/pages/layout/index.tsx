import { Flex } from "native-base";
import TopBar from "./top-bar";
import HorizontalNavigator from "./horizontal-navigator";
import BottomBar from "./bottom-bar";
import useStartup from "../../custom hooks/useStartup";
import { useEffect } from "react";
import { useAppSelector } from "../../custom hooks/hooks";


export default function Layout() {
    const {passToken} = useStartup();
    const accessToken  = useAppSelector(state => state.user.accessToken)

    useEffect(() => {
        if (accessToken) {
            passToken(accessToken);
        }
    }, [accessToken])

    return (
        <Flex flex = {1} safeAreaTop bg = 'background'> 
            <Flex flex = {1}>
                <TopBar/>
                <HorizontalNavigator/>
                <BottomBar/>
            </Flex>
        </Flex>
    );
};