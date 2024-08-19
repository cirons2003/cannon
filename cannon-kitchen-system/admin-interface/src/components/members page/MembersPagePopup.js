import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MembersPagePopup({ isOpen, onClose: closeModal, addMember, changePassword, addModal, userEmail }) {
    const colors = useSelector(state => state.theme.colors);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const onSave = () => {
        if (validate()) {
            if (addModal) {
                addMember(firstName, lastName, email, () => onClose())
            } else {
                changePassword(userEmail, onClose)
            }
        }
    }

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            onSave()
        }
    }

    const clear = () => {
        setEmail('')
        setFirstName('')
        setLastName('')
    }

    const validate = () => {
        if (addModal) {
            if (firstName === '' || lastName === '' || email === '') {
                alert('all fields are required')
                return false;
            }
        }
        return true;
    }

    const onClose = () => {
        clear()
        closeModal()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color={colors.primary} bg={colors.secondary}>
                    <ModalHeader>
                        <Flex align='center'>
                            <Text fontSize='25px' as='b' color={colors.primary}>{addModal ? 'Add Member' : `Reset password for ${userEmail}`}</Text>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflow='hidden'>
                        {addModal &&
                            <>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input onKeyPress={handlePress} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input onKeyPress={handlePress} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input onKeyPress={handlePress} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </FormControl>
                            </>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={onSave} bg={colors.primary} color={colors.secondary}>{addModal ? 'Add Member' : 'Change Password '}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}