import { useState } from "react";
import { MenuItem } from "../pages/menu-page/menu-items-scroll/menu-card"
import useError from "./useError";
import { useAppSelector } from "./hooks";
import axios from "axios";

export const useMenu = () => {
    const [listOfMenuItems, setListOfMenuItems] = useState<Array<MenuItem>>([]);
    const [filteredListOfMenus, setFilteredListOfMenuItems] = useState<Array<MenuItem>>([]); 
    const { handleErrors } = useError();
    const baseURL = useAppSelector(state => state.static.baseURL) + '/user';

    const getMenuItems = async() => {
        try {
            const response = await axios.get(baseURL+'/getMenuItems');
            console.log(response.data);
        }catch(err) {
            handleErrors(err);
        }
    }
    return {getMenuItems};
}
