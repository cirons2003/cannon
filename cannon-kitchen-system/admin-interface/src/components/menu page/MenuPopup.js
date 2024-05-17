import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function MenuPopup({isOpen, onClose, menuName, setMenuName, setMenuId, menuId, edit, createMenu, changeMenuName}) {
    const colors = useSelector(state => state.theme.colors);

    const onAdd = () => {
        createMenu(menuName, onClose)
    }

    const onEdit = () => {
        changeMenuName(menuId, menuName, onClose)
    }

    const onSave = () => {
        if (edit) 
            onEdit()
        else
            onAdd()
    }

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            onSave()
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color={colors.primary} bg={colors.secondary}>
                    <ModalHeader>
                        <Flex align='center'>
                            <Text fontSize='25px' as='b' color={colors.primary}>{edit ? 'Change Menu Name' : 'Choose a Menu Name'}</Text>  
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflow='hidden'>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input onKeyPress = {handlePress} value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={onSave} bg={colors.primary} color={colors.secondary}>Add Item</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
