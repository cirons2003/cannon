import axios from 'axios';
import { useAppDispatch, useAppSelector } from './hooks';
import { setDescription } from '../features/userSlice';
import { useEffect, useState } from 'react';
import { useFlash } from './useFlash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type changeDescriptionProps = {
    description: string;
};

const useUser = () => {
    const baseURL = useAppSelector(state => state.static.baseURL) + '/user';
    const dispatch = useAppDispatch();
    const [error, setError] = useState<boolean>(false);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { flash: flashError, cleanUp: cleanupError } = useFlash(setError);
    const { flash: flashConfirm, cleanUp: cleanupConfirm } = useFlash(setConfirmed);

    useEffect(() => {
        return () => {
            cleanupError();
            cleanupConfirm();
        }
    }, [cleanupConfirm, cleanupConfirm])

    const changeDescription = async (props: changeDescriptionProps) => {
        const { description } = props;
        try {
            const response = await axios.post(baseURL + '/changeDescription', { description: description });
            if (response?.data?.new_description) {
                dispatch(setDescription(response.data.new_description));
                const userString = await AsyncStorage.getItem('user');
                if (userString) {
                    const userObj = JSON.parse(userString);
                    userObj.description = response.data.new_description;
                    console.log(userObj)
                    await AsyncStorage.setItem('user', JSON.stringify(userObj));
                }
                flashConfirm(3000);
            }
        } catch (err) {
            console.error(err)
            flashError(3000)
        }
    }

    const changePassword = async (temporary_password: string, new_password: string) => {
        try {
            const response = await axios.post(baseURL + '/changePassword', { temporary_password, new_password })
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    const resetPassword = async (email: string) => {
        setIsLoading(true)
        try {
            const response = await axios.post(baseURL + '/resetPassword', { email: email });
            setIsLoading(false)
            return true
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            return false
        }
    }

    return { changeDescription, error, confirmed, changePassword, resetPassword, isLoading };
};

export default useUser;
