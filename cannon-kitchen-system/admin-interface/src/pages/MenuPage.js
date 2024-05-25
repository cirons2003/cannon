import { Flex } from "@chakra-ui/react";
import MenuTopBar from "../components/menu page/MenuTopBar";
import Menus from "../components/menu page/Menus";
import { useEffect, useState } from "react";
import useMenus from "../custom hooks/useMenus";
import MenuPopup from "../components/menu page/MenuPopup";
import AddItemPopup from "../components/menu page/AddItemPopup";
import useMealLibrary from "../custom hooks/useMealLibrary";




export default function MenuPage() {
    const {getMenus, createMenu, filteredListOfMenus, filterMenus, removeMenu, changeMenuName, changeMenuItems, removeItemFromMenu} = useMenus()
    const {getMealLibrary, filteredListOfMenuItems, listOfMenuItems, filterItems} = useMealLibrary()

    const [searchTerm, setSearchTerm] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [menuName, setMenuName] = useState('')
    const [menuId, setMenuId] = useState('')
    const [edit, setEdit] = useState(false)
    const [addingItems, setAddingItems] = useState(false)
    const [indices, setIndices] = useState([])
    const [itemSearchTerm, setItemSearchTerm] = useState('')
    

    useEffect(()=> {
        const clear = setTimeout((()=> {getMenus(); getMealLibrary()}), 300)
        return () => clearTimeout(clear)
    }, [])

    const closeModal = () => {
        setMenuName('')
        setMenuId('')
        setModalOpen(false)
        setEdit(false)
    }

    const stopAddingItems = () => {
        setMenuId(-1)
        setMenuName('')
        setIndices([])
        setItemSearchTerm('')
        setAddingItems(false)
    }

    const openEditModal = (id, name) => {
        setEdit(true)
        setMenuId(id)
        setMenuName(name)
        setModalOpen(true)
    }

    const startAddingItems = (id, name, indices) => {
        setMenuId(id)
        setMenuName(name)
        setIndices(indices)
        setAddingItems(true)
    }

    useEffect(()=> {
        const clear = setTimeout(()=> filterMenus(searchTerm), 300)
        return () => clearTimeout(clear)
    }, [searchTerm])

    useEffect(()=> {
        const clear = setTimeout(()=> filterItems(itemSearchTerm), 300)
        return () => clearTimeout(clear)
    }, [itemSearchTerm])    

    return (
        <Flex width = '100%' flex = {1} justify = 'start' direction = 'column'>
            <MenuTopBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm} openModal = {()=>setModalOpen(true)}/>
            <Menus removeItemFromMenu = {removeItemFromMenu} startAddingItems = {startAddingItems} removeMenu = {removeMenu} listOfMenus = {filteredListOfMenus} openEditModal = {openEditModal}/>
            <MenuPopup changeMenuName = {changeMenuName} createMenu = {createMenu} edit = {edit} isOpen= {modalOpen} onClose = {closeModal} setMenuName = {setMenuName} menuName = {menuName} setMenuId={setMenuId} menuId = {menuId} />
            <AddItemPopup itemSearchTerm = {itemSearchTerm} setItemSearchTerm = {setItemSearchTerm} changeMenuItems = {changeMenuItems} menuName = {menuName} menuId = {menuId} indices = {indices} isOpen={addingItems} onClose = {stopAddingItems} listOfMenuItems = {listOfMenuItems} filteredListOfMenuItems = {filteredListOfMenuItems}/>
        </Flex>
    )
}   