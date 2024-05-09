import { Flex, Icon } from "@chakra-ui/react";
import SideButton from "./SideButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCalendar, faBurger } from '@fortawesome/free-solid-svg-icons';


export default function SideBar() {
    return (
        <Flex mr = '40px' height = '100%' width = '220px'  direction = 'column' align = 'start' justify = 'start' py = '30px' pr = '10px' gap = '15px'>
            <SideButton to = 'meals' icon = {<FontAwesomeIcon icon = {faCalendar}/>} text = 'Meal Schedule'/>
            <SideButton to = 'menus' icon = {<FontAwesomeIcon icon = {faUtensils}/>} text = 'Menus'/>
            <SideButton to = 'library' icon = {<FontAwesomeIcon icon = {faBurger}/>} text = 'Library'/>
        </Flex>
    )
}