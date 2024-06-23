import { useState } from "react";
import { MenuItem } from "../pages/menu-page/menu-items-scroll/menu-card"
import useError from "./useError";
import { useAppSelector } from "./hooks";
import axios from "axios";

export const useMenu = () => {
    const [listOfMenuItems, setListOfMenuItems] = useState<Array<MenuItem>>([]);
    const [filteredListOfMenuItems, setFilteredListOfMenuItems] = useState<Array<MenuItem>>([]);
    const [activeMealName, setActiveMealName] = useState<string>('');
    const [issueMessage, setIssueMessage] = useState<string>('');
    const [durationString, setDurationString] = useState<string>('');
    const { handleErrors } = useError();
    const baseURL = useAppSelector(state => state.static.baseURL) + '/user';
    const [loading, setLoading] = useState(true);

    const clear = () => {
        setListOfMenuItems([]);
        setFilteredListOfMenuItems([]);
        setActiveMealName('');
        setIssueMessage('');
    };

    const getMenuItems = async () => {
        clear();
        setLoading(true);
        try {
            const response = await axios.get(baseURL + '/getMenuItems');
            const data = response.data;
            if (data.flag === -1) {
                setIssueMessage(data.display_message);
            }
            else if (data.flag === 0) {
                setIssueMessage(data.display_message);
                setActiveMealName(data.active_meal_name);
                setDurationString(data.duration_string);
            }
            else if (data.flag === 1) {
                const val = data.menu_items;
                setActiveMealName(data.active_meal_name);
                setListOfMenuItems(val);
                setFilteredListOfMenuItems(val);
                setDurationString(data.duration_string);
            }
            else {
                console.error('Implementation Error: Indataid meal fetching flag');
            }
        } catch (err) {
            handleErrors(err);
        }
        setLoading(false);
    };

    const filterMenuItems = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredListOfMenuItems(listOfMenuItems);
            return;
        }

        const filtered = listOfMenuItems.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        setFilteredListOfMenuItems(filtered);
    };

    return { getMenuItems, filteredListOfMenuItems, filterMenuItems, activeMealName, loading, issueMessage, durationString };
}   
