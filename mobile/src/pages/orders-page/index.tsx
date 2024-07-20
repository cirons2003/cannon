import { Flex, ScrollView, Text } from "native-base";
import { useEffect } from "react";
import { useOrders } from "../../custom hooks/useOrders";
import { OrderCard } from "./order-card";


export default function OrdersPage() {
    const { getPastOrders, groupedOrders } = useOrders();

    useEffect(() => {
        const clear = setTimeout(() => getPastOrders(), 300)
        return () => clearTimeout(clear);
    }, [])

    return (
        <Flex mt='lg' bg='background' flex={1}>
            <Flex flex={1} alignItems="stretch" position='relative' ml='sm'>
                <Flex borderBottomColor='secondary' borderBottomWidth='3px' direction="row" align='center'>
                    <Text fontSize='lg' fontFamily='primary' color='secondary' >Past Orders</Text>
                </Flex>
                <ScrollView pt='md' pr='sm'>
                    {groupedOrders?.map((orderGroup) => (
                        <Flex mb='md'>
                            <Text bold fontFamily='primary' fontSize='md' color='primary' underline>{orderGroup.meal_name}</Text>
                            <Flex>
                                {orderGroup?.orders?.map((order) => (
                                    <OrderCard order={order} />
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                    {groupedOrders?.map((orderGroup) => (
                        <Flex>
                            <Text fontFamily='primary' fontSize='md' color='primary' underline>{orderGroup.meal_name}</Text>
                            <Flex>
                                {orderGroup?.orders?.map((order) => (
                                    <Text>{order.item_name}</Text>
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                </ScrollView>
            </Flex>
        </Flex>
    );
};
