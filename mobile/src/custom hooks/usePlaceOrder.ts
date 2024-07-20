import axios from "axios";
import { Field } from "../pages/menu-page/menu-popup";
import { useAppSelector } from "./hooks";
import useError from "./useError";
import { useEffect, useState } from "react";
import { useFlash } from "./useFlash";
import { useOrders } from "./useOrders";

export type OrderProps = {
    item_name: string;
    selections: string[];
};


export const usePlaceOrder = () => {
    const baseURL = useAppSelector(state => state.static.baseURL) + '/order';
    const { handleErrors, errorMessage, clearErrors } = useError();
    const { getPastOrders } = useOrders();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
    const [orderFailed, setOrderFailed] = useState<boolean>(false);

    const { flash: flashConfirm, cleanUp: cleanUpConfirm } = useFlash(setOrderConfirmed);
    const { flash: flashError, cleanUp: cleanUpError } = useFlash(setOrderFailed, clearErrors);

    useEffect(() => {
        return () => {
            cleanUpConfirm();
            cleanUpError();
        }
    }, [cleanUpConfirm, cleanUpError])

    const placeOrder = async (props: OrderProps) => {
        const { item_name, selections } = props;
        setIsLoading(true);
        try {
            const response = await axios.post(baseURL + '/placeOrder', { item_name: item_name, selections: selections });
            getPastOrders();
            flashConfirm(3000);
        } catch (err) {
            flashError(5000)
            handleErrors(err)
        } finally {
            setIsLoading(false);
        }
    };

    return { placeOrder, isLoading, orderConfirmed, orderFailed, errorMessage };
};
