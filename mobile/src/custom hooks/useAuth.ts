import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser } from '../features/userSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useError from "./useError";
import { setConfirmingToken, setConnected } from "../features/validationSlice";

export type loginProps = {
    email: string,
    password: string,
    onSuccess?: () => void;
}

export const useAuth = () => {
    const baseURL = useAppSelector(state => state.static.baseURL) + '/memberAuth';
    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState(false)
    const [loading, setLoading] = useState(false);
    const { handleErrors, errorCode, errorMessage, clearErrors } = useError();

    const login = async (props: loginProps) => {
        const { email, password, onSuccess } = props;
        try {
            const response = await axios.post(baseURL + '/login', { email: email, password: password });
            const data = response.data;
            const userObj = {
                firstName: data?.first_name,
                lastName: data?.last_name,
                accessToken: data?.access_token,
                description: data?.description,
            };
            await AsyncStorage.setItem('user', JSON.stringify(userObj));
            dispatch(setUser(userObj));
            if (onSuccess) {
                onSuccess();
            }
            return true
        } catch (err) {
            setIsError(true)
            console.error(err);
            return false
        }
    };

    const clearError = () => {
        setIsError(false)
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch(setUser({}));
        } catch (err) {
            console.error(err);
        }
    }

    const confirmToken = async () => {
        try {
            const response = await axios.get(baseURL + '/confirmToken');
            const isLoggedIn = response.data?.is_logged_in;
            if (isLoggedIn === false) {
                logout();
            }
            else {
                setConnected(true);
                dispatch(setConfirmingToken(false));
                console.log('token confirmed');
            }
        }
        catch (err: any) {
            handleErrors(err);
        }
    };

    return { login, isError, clearError, loading, logout, confirmToken };
};