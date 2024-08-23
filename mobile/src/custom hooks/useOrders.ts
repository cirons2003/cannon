import axios from "axios";
import { useAppDispatch, useAppSelector } from "./hooks";
import useError from "./useError"
import { setGroupedOrders } from "../features/dataSlice";
import { useState } from "react";

export type PastOrder = {
    order_id: number,
    item_name: string;
    meal_name: string;
    meal_date: string;
    status: string;
    selections: string[];
}

export type GroupedOrder = {
    meal_name: string;
    orders: PastOrder[];
}

export const useOrders = () => {
    const { handleErrors } = useError();
    const dispatch = useAppDispatch();
    const baseURL = useAppSelector(state => state.static.baseURL) + '/user';

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPastOrders = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(baseURL + '/getPastOrders');
            dispatch(setGroupedOrders(groupOrders(response.data.orders)));
        } catch (err) {
            handleErrors(err);
        }
        finally {
            setIsLoading(false);
        }
    };

    const groupOrders = (orders: PastOrder[]) => {
        const groupedOrders = orders.reduce<{ [meal_name: string]: PastOrder[] }>((acc, order) => {
            const dateString = order.meal_date?.substring(5, 7) + '/' + order.meal_date?.substring(8, 10);
            const meal_name = dateString + ' | ' + order.meal_name
            if (!(meal_name in acc)) {
                acc[meal_name] = []
            }
            acc[meal_name].push(order)
            return acc;
        }, {})

        return Object.entries(groupedOrders).map<GroupedOrder>(([meal_name, orders]) => ({
            meal_name: meal_name,
            orders: orders,
        }))?.sort((a, b) => -1 * (a.orders[0].meal_date).localeCompare(b.orders[0].meal_date));
    }

    return { getPastOrders, isLoading }
};