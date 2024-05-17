import { Button, Checkbox, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";

export default function AddItemPopup({ isOpen, onClose, listOfMenuItems, filteredListOfMenuItems, indices, menuName, menuId, changeMenuItems, itemSearchTerm, setItemSearchTerm}) {
    const colors = useSelector(state => state.theme.colors)
    const [checkedItems, setCheckedItems] = useState(listOfMenuItems?.map((item) => (indices.includes(item.item_id))))

    const handleCheckboxChange = (index) => {
        setCheckedItems(currentCheckedItems => currentCheckedItems.map((item, i) => (i === index ? !item : item)))
        setItemSearchTerm('')
    }

    useEffect(()=> {
         setCheckedItems(listOfMenuItems.map(item => indices.includes(item.item_id)))
    }, [indices, listOfMenuItems])


    const onSave = () => {
        const indices = [];
        listOfMenuItems?.forEach((item, index) => {
            if (checkedItems[index]) {
                indices.push(item.item_id)
            }
        })
        console.log(indices)
        changeMenuItems(menuId, indices, onClose)
    }

    const isHidden = (item) => {
        return !filteredListOfMenuItems.map((it)=>(it.item_id)).includes(item.item_id)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent  bg = {colors.secondary} color = {colors.primary}>
                <ModalHeader>Change Items in {menuName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <SearchBar mb = '15px' borderColor = {colors.primary} searchTerm={itemSearchTerm} setSearchTerm={setItemSearchTerm} bg = {colors.secondary} size = {7} />   
                    <Stack spacing = {4} gap = {3}>
                        {listOfMenuItems?.length > 0 ? listOfMenuItems?.map((item, index) => (
                            <Flex hidden = {isHidden(item)} onClick = {() => handleCheckboxChange(index)}  _hover = {{cursor: 'pointer'}} px = '8px' borderRadius = '20px' borderColor = {colors.primary} borderBottomWidth = '1px' borderLeftWidth = '1px' key={index} justify="space-between" align="center">
                                <Text>{item.name}</Text>
                                <Checkbox
                                    isChecked={checkedItems[index]}
                                    onChange={()=>handleCheckboxChange(index)}
                                    sx = {{'.chakra-checkbox__control': {
                                        _checked: {
                                            bg: colors.primary, 
                                            borderColor: colors.primary
                                        }
                                    }}}
                                />
                            </Flex>
                        )) : <Text>No Items in Library</Text>}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button _hover = {{backgroundColor: 'transparent', opacity: '70%'}} bg = 'transparent' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button _hover = {{backgroundColor: colors.primary, opacity: '70%'}} bg = {colors.primary} color = {colors.secondary} onClick={onSave}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
