import axios from "axios";
import { useAppSelector } from "./hooks";
import useError from "./useError"
import { useState } from "react";

export type PastOrder = {
    order_id: number,
    item_name: string;
    meal_name: string;
    status: string;
    selections: string[];
}

export type GroupedOrder = {
    meal_name: string;
    orders: PastOrder[];
}

export const useOrders = () => {
    const { handleErrors } = useError();
    const baseURL = useAppSelector(state => state.static.baseURL) + '/user';

    const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>();

    const getPastOrders = async () => {
        try {
            const response = await axios.get(baseURL + '/getPastOrders');
            setGroupedOrders(groupOrders(response.data.orders))
        } catch (err) {
            handleErrors(err);
        }
    };

    const groupOrders = (orders: PastOrder[]) => {
        const groupedOrders = orders.reduce<{ [meal_name: string]: PastOrder[] }>((acc, order) => {
            if (!(order.meal_name in acc)) {
                acc[order.meal_name] = []
            }
            acc[order.meal_name].push(order)
            return acc;
        }, {})

        return Object.entries(groupedOrders).map<GroupedOrder>(([meal_name, orders]) => ({
            meal_name: meal_name,
            orders: orders,
        }));
    }

    return { getPastOrders, groupedOrders }
};