import { useState } from "react";
import useError from "./useError";
import { useAppDispatch, useAppSelector } from "./hooks";
import axios from "axios";
import { setConnected } from "../features/validationSlice";


export const useCheckConnection = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {handleErrors} = useError();
    const baseURL = useAppSelector(state => state.static.baseURL) + '/memberAuth'
    const dispatch = useAppDispatch();

    const checkConnection = async() => {
        console.log('checking connection')
        setLoading(true);
        try {
            const response = await axios.get(baseURL+'/confirmToken');
            dispatch(setConnected(true));
        }
        catch(err) {
            handleErrors(err);
        }
        setLoading(false);
    }

    return {checkConnection, loading}
}