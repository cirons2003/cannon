import PagerView from 'react-native-pager-view';
import OrdersPage from '../../orders-page';
import MenuPage from '../../menu-page';
import ProfilePage from '../../profile-page';
import { useAppDispatch } from '../../../custom hooks/hooks';
import { setPage } from '../../../features/navigationSlice';
import React from 'react';

type HNProps = {
    pagerRef: React.RefObject<PagerView>;
};

export default function HorizontalNavigator({ pagerRef }: HNProps) {
    const dispatch = useAppDispatch();

    const onPageSelected = (e: any) => {
        dispatch(setPage(e.nativeEvent.position));
    };

    return (
        <PagerView
            initialPage={1}
            ref={pagerRef}
            style={{ flex: 1 }}
            onPageSelected={onPageSelected}
        >
            <OrdersPage key="0" />
            <MenuPage key="1" />
            <ProfilePage key="2" />
        </PagerView>
    );
}
