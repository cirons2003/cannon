import axios from "axios";
import { Field } from "../pages/menu-page/menu-popup";
import { useAppSelector } from "./hooks";
import useError from "./useError";
import { useEffect, useState } from "react";
import { useFlash } from "./useFlash";

export type OrderProps = {
    item_name: string;
    selections: string[];
};


export const usePlaceOrder = () => {
    const baseURL = useAppSelector(state => state.static.baseURL) + '/order';
    const { handleErrors } = useError();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
    const [orderFailed, setOrderFailed] = useState<boolean>(false);

    const { flash: flashConfirm, cleanUp: cleanUpConfirm } = useFlash(setOrderConfirmed);
    const { flash: flashError, cleanUp: cleanUpError } = useFlash(setOrderFailed);

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
            flashConfirm(3000);
        } catch (err) {
            flashError(3000)
            handleErrors(err)
        } finally {
            setIsLoading(false);
        }
    };

    return { placeOrder, isLoading, orderConfirmed, orderFailed };
};
