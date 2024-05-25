import { Flex } from "@chakra-ui/react";
import SideButton from "./SideButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCalendar, faBurger } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux'


export default function SideBar() {
    const colors = useSelector(state => state.theme.colors)
    return (
        <Flex direction = 'column' justify = 'space-between' align = 'start' py = '30px' pr = '10px' width = '220px' height = '100%' mr = '40px'>
            <Flex direction = 'column' align = 'start' justify = 'start' gap = '15px'>
                <SideButton to = '' icon = {<FontAwesomeIcon icon = {faCalendar}/>} text = 'Meal Schedule'/>
                <SideButton to = 'menus' icon = {<FontAwesomeIcon icon = {faUtensils}/>} text = 'Menus'/>
                <SideButton to = 'library' icon = {<FontAwesomeIcon icon = {faBurger}/>} text = 'Library'/>
            </Flex>
        </Flex>
    )
}