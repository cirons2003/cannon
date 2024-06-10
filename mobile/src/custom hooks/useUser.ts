import axios from 'axios';
import { useAppDispatch, useAppSelector } from './hooks';
import { setDescription } from '../features/userSlice';

export type changeDescriptionProps = {
    description: string;
    onSuccess?: () => void;
}

const useUser = () => {
    const baseURL = useAppSelector(state => state.static.baseURL) + '/user';
    const dispatch = useAppDispatch();

    const changeDescription = async(props: changeDescriptionProps) => {
        const {description, onSuccess} = props
        try {
            const response = await axios.post(baseURL + '/changeDescription', {description: description});
            if (response?.data?.new_description) {
                dispatch(setDescription(response.data.newDescription));
                if (onSuccess) {
                    onSuccess();
                }
            }
        }catch(err) {
            console.error(err)
        }
    }
    return {changeDescription}
}

export default useUser;
