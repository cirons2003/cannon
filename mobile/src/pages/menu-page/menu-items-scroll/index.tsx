import { Flex, ScrollView, VStack } from 'native-base';
import { MenuCard, MenuItem } from './menu-card';

export type MenuItemsScrollProps = {
    listOfMenuItems?: Array<MenuItem>;

};
const menuItem = {
    item_id: 17,
    name: 'Turkey Shoot',
    description: 'Yummy Sandwich taht you should totally eat because it is really good and tasty... like seriously it is super yummy and tasty'
};


export const MenuItemsScroll = (props: MenuItemsScrollProps) => {
    const { listOfMenuItems } = props;
    return (
        <Flex direction='column' alignItems='stretch' flex={1}>
            <ScrollView pb='sm' px='md'>
                <VStack space='sm' overflow='auto'>
                    {Array.from({ length: 12 })?.map((_, i) =>
                        <MenuCard menuItem={menuItem} key={i} />
                    )}
                </VStack>
            </ScrollView>
        </Flex>
    );
};
