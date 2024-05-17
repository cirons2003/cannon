import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Items from "./Items";
import DeleteConfirmation from "../DeleteConfirmation";
import { useState } from "react";



export default function MenuCard({menu, num, openEditModal, removeMenu, startAddingItems, removeItemFromMenu}) {
    const colors = useSelector(state => state.theme.colors)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [itemDeleteOpen, setItemDeleteOpen] = useState(false)
    const [focusedItemName, setFocusedItemName] = useState('')
    const [focusedItemId, setFocusedItemId] = useState(-1)

    const closeItemDelete = () => {
        setItemDeleteOpen(false)
        setFocusedItemId(-1)
        setFocusedItemName('')
    }

    const men = {
        menu_id: 12,
        name: 'Sample Menu',
        item_count: 2,
        items: [{item_id: 1, name: 'Turkey Shoot'}, {item_id: 2, name: 'Breakfast Sandwich'}]
    }

    const openEdit = () => {
        openEditModal(menu?.menu_id, menu?.name)
    }

    const onDelete = () => {
        removeMenu(menu.menu_id, () => setDeleteOpen(false))
    }

    const startAdding = () => {
        startAddingItems(menu.menu_id, menu.name, menu.items.map((item)=>(item.item_id)))
    }

    const removeItem = () => {
        removeItemFromMenu(menu.menu_id, focusedItemId, closeItemDelete)
    }

    return (
        <Flex bg = {colors.secondary} color = {colors.primary} borderWidth = '1px' borderColor = {colors.primary} borderRadius = '20px' p = '10px' overflowY = 'hidden' minwidth = '200px' maxWidth = '360px' flex = {1} height = '250px' direction = 'column'>
            <Flex pos = 'relative' width = '100%' justify = 'space-between' align = 'center' wrap='wrap' mb = '5px'> 
                <Flex bg = 'transparent' p = {0} _hover = {{backgroundColor: 'transparent', opacity: '70%'}} as = {Button} onClick = {openEdit}>
                    <Text color = {colors.primary} isTruncated as = 'b' fontSize = '20px' >{menu?.name ? menu.name : `Menu ${num}`}</Text>
                </Flex>
                <Flex align = 'center' gap = {2} >
                    <IconButton onClick = {startAdding} size = {10} _hover = {{backgroundColor: 'transparent', opacity: '70%'}} icon = {<FontAwesomeIcon icon = {faEdit}/>} bg = 'transparent' color = {colors.primary}/>
                    <IconButton size = {10} onClick = {() => setDeleteOpen(true)} _hover = {{backgroundColor: 'transparent', opacity: '70%'}} icon = {<FontAwesomeIcon icon = {faTrash}/>} bg = 'transparent' color = {colors.red}/>
                </Flex>
            </Flex>
            <hr/>
            <Flex width = '100%' overflow='hidden'>
                <Items setItemDeleteOpen = {setItemDeleteOpen} setFocusedItemName = {setFocusedItemName} setFocusedItemId={setFocusedItemId} listOfItems = {menu?.items ? menu.items : []}/>
            </Flex>
            <DeleteConfirmation isOpen={deleteOpen} onClose = {()=> setDeleteOpen(false)} header = {`Delete "${menu?.name}"?`} body = 'DANGER: This cannot be undone' onDelete = {onDelete}/>
            <DeleteConfirmation isOpen = {itemDeleteOpen} onClose = {closeItemDelete} header = {`Remove "${focusedItemName}" from "${menu?.name}"?`} body = 'This will only remove item from the menu, it will not delete the menu from the library!' onDelete = {removeItem}/>
        </Flex>
    )
}