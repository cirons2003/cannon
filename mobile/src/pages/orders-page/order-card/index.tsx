import { Flex, Text } from "native-base";
import { PastOrder } from "../../../custom hooks/useOrders";

export const OrderCard = ({ order }: { order: PastOrder }) => {
    const colorMap: { [orderStatus: string]: string } = {
        'pending': 'yellow.600',
        'placed': 'primary',
        'printed': 'secondary',
        'expired': 'error',
    }

    const secondaryColorMap: { [orderStatus: string]: string } = {
        'pending': 'yellow.500',
        'placed': 'tertiary',
        'printed': 'tertiary',
        'expired': 'red.100',
    }

    const statusMap: { [key: string]: string } = {
        'pending': 'order pending...',
        'placed': 'order placed',
        'printed': 'order printed',
        'expired': 'order expired',
    }

    const orderStatus: string = order.status;

    return (
        <Flex w='full' px='md' mb='md' pb='md' borderRadius='xl' borderColor={colorMap[orderStatus]} borderWidth='2px' borderLeftWidth='5px' borderBottomWidth='5px' pt='sm'>
            <Text fontFamily='primary' fontSize='md' color={colorMap[orderStatus]}>{order.item_name}</Text>
            <Flex ml='sm'>
                <Flex>
                    {order.selections.map((selection) => (
                        <Flex display='flex' direction="row">
                            <Flex px='sm' my='xs' display='flex' bg={secondaryColorMap[orderStatus]} borderRadius='full' flexShrink={1} >
                                <Text italic fontSize='sm' color={colorMap[orderStatus]} bold>{selection}</Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex position='absolute' top='-10px' right='-12px' py='2px' borderRadius='2xl' bg={colorMap[orderStatus]} px='sm'>
                <Text bold fontSize='14px' color='white'>{statusMap[orderStatus]}</Text>
            </Flex>
        </Flex >
    );
}