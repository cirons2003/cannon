import PagerView from "react-native-pager-view";
import OrdersPage from "../../orders-page";
import MenuPage from "../../menu-page";
import ProfilePage from "../../profile-page";
import { useAppDispatch, useAppSelector } from "../../../custom hooks/hooks";
import { setPage } from "../../../features/navigationSlice";
import { useEffect, useRef } from "react";


export default function HorizontalNavigator() {
    const pagerRef = useRef<PagerView>(null);
    const pageNum = useAppSelector(state => state.navigation.pageNum);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pagerRef.current) {
            pagerRef.current.setPage(pageNum);
        }
    }, [pageNum, pagerRef])

    const onPageSelected = (e: any) => {
        dispatch(setPage(e.nativeEvent.position));
    };

    return (
        <PagerView initialPage={1} ref={pagerRef} style={{ flex: 1 }} onPageSelected={onPageSelected}>
            <OrdersPage key='0' />
            <MenuPage key='1' />
            <ProfilePage key='2' />
        </PagerView>
    );
};