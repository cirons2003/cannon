import { Button, Flex, Text } from "native-base";
import { useAuth } from "../../custom hooks/useAuth";
import { SearchBar } from "../../components/search-bar";
import { useEffect, useState } from "react";
import { MenuItemsScroll } from "./menu-items-scroll";
import { useMenu } from "../../custom hooks/useMenu";
import { useDebounce } from "../../custom hooks/useDebounce";
import { Item, MenuPopup } from "./menu-popup";
import { usePlaceOrder } from "../../custom hooks/usePlaceOrder";
import { Loading } from "../../components/loading";
import { AlertPopup } from "../../components/alert-popup";
import { useOrders } from "../../custom hooks/useOrders";


export default function MenuPage() {
    const { getMenuItems, filteredListOfMenuItems, filterMenuItems, activeMealName, loading, durationString } = useMenu();
    const { debounce } = useDebounce();
    const { debounce: searchDebounce } = useDebounce();
    const { placeOrder, isLoading: orderBeingPlaced, orderConfirmed, orderFailed, errorMessage } = usePlaceOrder();
    const { getPastOrders } = useOrders();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<Item | undefined>(undefined);

    useEffect(() => {
        const clear = debounce(getMenuItems, 100);
        return clear;
    }, []);

    useEffect(() => {
        const searchClear = searchDebounce(() => filterMenuItems(searchTerm), 300);

        return searchClear;
    }, [searchTerm]);

    useEffect(() => {
        if (orderFailed) {
            const clear = debounce(getMenuItems, 100);
            return clear;
        }
        if (orderConfirmed) {
            const clear = debounce(getPastOrders, 100);
            return clear;
        }
    }, [orderFailed, orderConfirmed])

    const openOrderModal = (item: Item) => {
        setActiveItem(item);
        setModalOpen(true);
    };

    const onClose = () => {
        setModalOpen(false);
        setActiveItem(undefined);
    }

    if (loading) {
        return <Loading />
    }

    return (
        <Flex mt='lg' bg='background' flex={1}>
            <Flex flex={1} alignItems="stretch" position='relative'>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} mx='md' color='primary' />
                <MenuItemsScroll openOrderModal={openOrderModal} refresh={getMenuItems} listOfMenuItems={filteredListOfMenuItems} activeMealName={activeMealName} loading={loading} durationString={durationString} getMenuItems={getMenuItems} />
                <MenuPopup placeOrder={placeOrder} isOpen={modalOpen} onClose={onClose} item={activeItem} />
                {orderBeingPlaced && <Loading loadingMessage="Placing your order" absolute={true} />}
                {orderConfirmed && <AlertPopup bg='white' color='secondary' alertText='Order placed!' />}
                {orderFailed && <AlertPopup fontSize='sm' bg='white' color='error' alertText={errorMessage || 'Order could not be placed'} iconVariant="error" />}
            </Flex>
        </Flex>
    );
};
