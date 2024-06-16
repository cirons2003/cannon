import { Flex, Pressable, ScrollView, Text } from 'native-base';

export type MenuItem = {
    item_id: number;
    name: string;
    description?: string;
    image_url?: string;
    field?: object;
};

export type MenuCardProps = {
    menuItem: MenuItem;
};

export const MenuCard = (props: MenuCardProps) => {
    const { menuItem } = props;
    return (
        <Pressable borderRadius='xl' px='xs' py='sm' alignItems='start' borderWidth='2px' borderColor='primary'>
            <Flex direction='row' borderRadius='full' bg='secondary' display='inline-flex' px='sm' >
                <Text bold color='white' numberOfLines={1} >{menuItem.name}</Text>
            </Flex>
            <ScrollView px='xs'>
                <Text color='primary' bold numberOfLines={3}>{menuItem.description ?? 'No description'}</Text>
            </ScrollView>
        </Pressable>
    );
};
