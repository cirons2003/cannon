import { Flex, Icon, IconButton, ScrollView, Text, theme } from 'native-base';
import { useEffect } from 'react';
import { useOrders } from '../../custom hooks/useOrders';
import { OrderCard } from './order-card';
import { useAppSelector } from '../../custom hooks/hooks';
import { EvilIcons } from '@expo/vector-icons';
import { Loading } from '../../components/loading';

export default function OrdersPage() {
    const { getPastOrders, isLoading } = useOrders();
    const groupedOrders = useAppSelector((state) => state.data.groupedOrders);

    useEffect(() => {
        const clear = setTimeout(() => getPastOrders(), 700);
        return () => clearTimeout(clear);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Flex mt="lg" bg="background" flex={1}>
            <Flex flex={1} alignItems="stretch" position="relative" ml="sm">
                <Flex
                    borderBottomColor="secondary"
                    borderBottomWidth="3px"
                    direction="row"
                    align="center"
                    justify="space-between"
                    mr="md"
                >
                    <Text fontSize="lg" fontFamily="primary" color="secondary">
                        My Orders
                    </Text>
                    <IconButton
                        onPress={getPastOrders}
                        borderRadius="full"
                        p={0}
                        icon={
                            <Icon
                                as={EvilIcons}
                                name="refresh"
                                color="secondary"
                                size="2xl"
                            />
                        }
                    />
                </Flex>
                <ScrollView pt="md" pr="sm" flex={1}>
                    {!!groupedOrders?.length ? (
                        groupedOrders?.map((orderGroup) => (
                            <Flex
                                mb="md"
                                key={`meal_group_${orderGroup.meal_name}`}
                            >
                                <Text
                                    isTruncated
                                    bold
                                    fontFamily="primary"
                                    fontSize="md"
                                    color="primary"
                                    underline
                                >
                                    {orderGroup.meal_name}
                                </Text>
                                <Flex mt="sm">
                                    {orderGroup?.orders?.map((order) => (
                                        <OrderCard
                                            key={`order_card_${order.order_id}`}
                                            order={order}
                                        />
                                    ))}
                                </Flex>
                            </Flex>
                        ))
                    ) : (
                        <Flex flex={1} align="center" justify="center">
                            <Text fontSize="lg">No Past Orders...</Text>
                        </Flex>
                    )}
                </ScrollView>
            </Flex>
        </Flex>
    );
}
