import { Button, Flex, Text } from "native-base";
import { useAuth } from "../../custom hooks/useAuth";
import { SearchBar } from "../../components/search-bar";
import { useEffect, useState } from "react";
import { MenuItemsScroll } from "./menu-items-scroll";
import { useMenu } from "../../custom hooks/useMenu";
import { useDebounce } from "../../custom hooks/useDebounce";


export default function MenuPage() {
    const { logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { getMenuItems } = useMenu();
    const { debounce } = useDebounce();

    useEffect(() => {
        const clear = debounce(getMenuItems, 300);

        return clear;
    }, []);

    return (
        <Flex mt='lg' bg='background' flex={1}>
            <Flex flex={1} alignItems="stretch">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} mb='md' mx='md' color='primary' />
                <MenuItemsScroll />
            </Flex>
        </Flex>
    );
};
