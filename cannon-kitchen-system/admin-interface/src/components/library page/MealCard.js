import { Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import Fields from "./Fields";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MealCard({item, num, openEditModal}) {

    const tem = {
        name: 'Turkey Shoot', 
        description: 'Sandwich with turkey, mayo, ham, avocado',
        fields: [{
                field_name: 'Toppings', 
                options: [  
                    'mushrooms', 
                    'lettuce', 
                    'bacon'
                ]
            }, {
                field_name: 'Bread Type',
                options: [
                    'wheat', 
                    'white'
                ]
            }
        ]
    }

    const colors = useSelector(state => state.theme.colors)

    const editMeal = () => {
        openEditModal(item?.item_id ? item.item_id : -1, item?.name ? item.name : '', item?.description ? item.description : '', item?.fields ? item.fields : [])
    }

    return (
        <Flex bg = {colors.secondary} color = {colors.primary} borderWidth = '1px' borderColor = {colors.primary} borderRadius = '20px' p = '10px' overflowY = 'hidden' width = '250px' height = '250px' direction = 'column'>
            <Flex  width = '100%' justify = 'space-between' align = 'center' > 
                <Text as = 'b' fontSize = '20px' >{item?.name ? item.name : `Menu Item ${num}`}</Text>
                <IconButton onClick = {editMeal} _hover = {{backgroundColor: 'transparent', opacity: '70%'}} icon = {<FontAwesomeIcon icon = {faEdit}/>} bg = 'transparent' color = {colors.primary}/>
            </Flex>
            <Flex align = 'center' mb = {3} maxHeight = '30%' width = '100%'>
                <Text noOfLines={3} textOverflow= 'ellipsis' fontSize = '15px'>{item?.description ? `"${item.description}"` : 'No description'}</Text>
            </Flex>
            <Flex flex = {1} width = '100%' overflow='auto' direction='column' >
                {item?.fields?.length > 0 ? <Fields fields = {item?.fields ? item.fields : Array.from({length:0})}/> : <Flex flex = {1} align = 'center' justify = 'center'><hr/><br/><Text></Text></Flex>}
            </Flex>
        </Flex>
    )
}