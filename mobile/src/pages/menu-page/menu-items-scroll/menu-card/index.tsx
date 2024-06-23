import { Flex, Pressable, ScrollView, Text } from 'native-base';
import { Item } from '../../menu-popup';

export type MenuItem = {
    item_id: number;
    name: string;
    description?: string;
    image_url?: string;
    field?: object;
};

export type MenuCardProps = {
    menuItem: MenuItem;
    openOrderModal: (item: Item) => void;
};

export const MenuCard = (props: MenuCardProps) => {
    const { menuItem, openOrderModal } = props;
    return (
        <Pressable onPress={() => openOrderModal(menuItem)} borderRadius='xl' px='xs' py='sm' alignItems='start' borderWidth='2px' borderColor='primary' _pressed={{opacity: 60}}>
            <Flex direction='row' borderRadius='full' bg='secondary' display='inline-flex' px='sm' >
                <Text bold color='white' numberOfLines={1} >{menuItem.name}</Text>
            </Flex>
            <ScrollView px='xs'>
                <Text color='primary' bold numberOfLines={3}>{menuItem?.description !== '' ? menuItem.description : 'No description'}</Text>
            </ScrollView>
        </Pressable>
    );
};
