import { useState } from "react";
import { logout } from "../features/userSlice";
import { useAppDispatch } from "./hooks";


const useError = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const dispatch = useAppDispatch();

    const handleErrors = (err: any) => {
        if (err.response) {
            setErrorCode(err.response.status);
            console.log(err.response.data)
            if (err.response.data.msg) {
                setErrorMessage(err.response.data.msg);
                console.log(err.response.data.msg)
            }
            if (err.response.status === 401) {
                setErrorMessage('Stale token... returning to login page');
                dispatch(logout());
            }
        }
        else {
            setErrorMessage('An unexpected Error has occured');
            console.error(err);
        }
    };

    const clearErrors = () => {
        setErrorCode(null);
        setErrorMessage('');
    };

    return { handleErrors, errorMessage, errorCode, clearErrors };
};

export default useError;
