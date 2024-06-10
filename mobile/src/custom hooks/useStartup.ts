import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../custom hooks/hooks';
import { setUser } from '../features/userSlice'
import { useAuth } from './useAuth';

const useStartup = () => {
    const dispatch = useAppDispatch();
    const {confirmToken} = useAuth();

    const passToken = async(authToken: string) => { 
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${authToken}`;
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        console.log('token passed')
        await confirmToken();
    };

    const rememberState: () => void = async() => {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
            const userObj = JSON.parse(userString);
            dispatch(setUser(userObj));
        }
    }

    return {passToken, rememberState};
};

export default useStartup;