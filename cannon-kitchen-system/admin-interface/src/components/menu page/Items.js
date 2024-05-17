import { Flex, IconButton, Text } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";



export default function Items({listOfItems, setItemDeleteOpen, setFocusedItemName, setFocusedItemId}) {
    const colors = useSelector(state => state.theme.colors)

    const onDelete = (name, id) => {
        setFocusedItemName(name)
        setFocusedItemId(id)
        setItemDeleteOpen(true)
    }
    return (
        <Flex width = '100%' direction = 'column' marginTop = '5px' overflow = 'auto'>
            {listOfItems.map((item, i)=>(
                <Flex align = 'center' justify = 'space-between' width = '100%' borderRadius={20} borderColor={colors.primary} px = '4px'>
                    <Text as = 'i' flex = {1} isTruncated key = {i}>({i+1}) {item?.name ? item.name : `item ${i}`} </Text>
                    <IconButton onClick = {()=>{onDelete(item?.name, item?.item_id)}} _hover = {{backgroundColor: 'transparent', opacity: '70%'}} fontSize = '16px' color = {colors.primary} bg = 'transparent' icon = {<FontAwesomeIcon icon = {faTrash}/>}/>
                </Flex>
            ))}
        </Flex>
    )
}   