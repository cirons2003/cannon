import { Button, Flex, Icon, ScrollView, Text, VStack, useTheme } from 'native-base';
import { MenuCard, MenuItem } from './menu-card';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Loading } from '../../../components/loading';
import { Item } from '../menu-popup';

export type MenuItemsScrollProps = {
    listOfMenuItems?: Array<MenuItem>;
    activeMealName?: string;
    loading?: boolean;
    durationString?: string;
    refresh?: () => void;
    openOrderModal: (item: Item) => void;
};

export const MenuItemsScroll = (props: MenuItemsScrollProps) => {
    const { listOfMenuItems, activeMealName, loading, durationString, refresh, openOrderModal } = props;
    const theme = useTheme();
    return (
        <Flex direction='column' alignItems='stretch' flex={1}>
            {activeMealName && loading !== undefined && !loading ?
                <ScrollView pb='sm' px='md'>
                    <Flex position='relative' alignItems='stretch' minHeight='30px' mb='sm' borderBottomColor='primary' borderBottomWidth='1px' mt='sm'>
                        <Flex alignItems='center' justify='center' direction='row' bg='secondary' borderRadius='full' position='absolute' top='-7px' right={0} display='inline-flex' px='4px' >
                            <Ionicons color='white' name='timer' />
                            <Text bold color='white' fontFamily='primary' fontSize='xs' >{durationString ?? '??:?? - ??:??'}</Text>
                        </Flex>
                        <Flex flex={1}>
                            <Text color='primary' bold fontFamily='primary' fontSize='md' numberOfLines={2}>{activeMealName}</Text>
                        </Flex>
                    </Flex>
                    <VStack space='sm' overflow='auto'>
                        {Array.isArray(listOfMenuItems) && listOfMenuItems.length > 0 ? listOfMenuItems?.map((menuItem, i) =>
                            <MenuCard menuItem={menuItem} key={i} openOrderModal={openOrderModal}/>
                        ) :
                            <Flex mt='sm' ml='md' flex={1} w='full' justifyContent='center'>
                                <Text color='primary' italic fontSize='sm'>No items found...</Text>
                            </Flex>
                        }
                    </VStack>
                </ScrollView >
                :
                <Flex flex={1} alignItems='center' justifyContent='space-around'>
                    {!(loading === true || loading === undefined) ? 
                        <Flex textAlign='center' align='center'>
                            <Text textAlign='center' color='primary' italic fontFamily='primary' fontSize='lg'>
                                Sorry, looks like the kitchen is closed!
                            </Text> 
                            <Button mt='md' borderRadius='full' leftIcon={
                                <SimpleLineIcons size={14} color={theme.colors.secondary} name='refresh'/>
                            } bg='white' _pressed={{ opacity: 70}} onPress={refresh}
                            >
                                <Text bold color='secondary' fontFamily='primary' fontSize='sm'>Refresh</Text>
                            </Button>
                        </Flex>
                    :
                        <Loading loadingMessage = 'checking for meals'/>
                    }
                    

                </Flex> 
            }
        </Flex >
    );
};
