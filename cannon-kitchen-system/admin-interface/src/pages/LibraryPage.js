import { Flex } from "@chakra-ui/react"
import LibraryItems from "../components/library page/LibraryItems"
import LibraryTopBar from "../components/library page/LibraryTopBar"
import ItemPopup from "../components/library page/ItemPopup"
import { useEffect, useState } from "react"
import { useMealLibrary } from "../custom hooks/useMealLibrary"


export default function LibraryPage() {
    const [modalOpen, setModalOpen] = useState(false)
    const {filteredListOfMenuItems, getMealLibrary, addMenuItem, editMenuItem, removeMenuItem, filterItems} = useMealLibrary()
    const [edit, setEdit] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [fieldList, setFieldList] = useState([])
    const [itemId, setItemId] = useState(-1)
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(()=>{
        const clear = setTimeout(()=> {
            getMealLibrary()
        }, 300)
        return () => clearTimeout(clear)
    }, [])

    useEffect(()=>{
        filterItems(searchTerm)
    },[searchTerm])

    const openEditModal = (itemId, name, desc, fields) => {
        setEdit(true)
        setModalOpen(true)
        setItemName(name)
        setItemDescription(desc)
        setFieldList(fields)
        setItemId(itemId)
    }
    
    return(
        <Flex overflow = 'hidden' width = '100%' direction = 'column' flex = {1}>
            <LibraryTopBar openModal={()=>setModalOpen(true)} filterItems = {filterItems} searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
            <LibraryItems openEditModal = {openEditModal} openPopup = {()=>setModalOpen(true)} listOfMenuItems={filteredListOfMenuItems} />
            <ItemPopup edit = {edit} setEdit={setEdit} addMenuItem = {addMenuItem} isOpen={modalOpen} onClose={()=>setModalOpen(false)}
                itemName = {itemName} setItemName={setItemName} itemDescription={itemDescription} 
                setItemDescription={setItemDescription} fieldList={fieldList} setFieldList={setFieldList}
                editMenuItem={editMenuItem} itemId = {itemId} setItemId = {setItemId} removeMenuItem={removeMenuItem}
            />
        </Flex>
    )
}