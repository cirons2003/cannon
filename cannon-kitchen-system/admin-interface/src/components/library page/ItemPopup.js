import { Button, Flex, FormControl, FormLabel, Icon, IconButton, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { DeleteIcon } from '@chakra-ui/icons'
import DeleteConfirmation from "../DeleteConfirmation";
import { useState } from "react";



export default function ItemPopup({ edit, setEdit, isOpen, onClose, addMenuItem, editMenuItem,
    itemName, setItemName, itemDescription, setItemDescription, fieldList, setFieldList,
    itemId, removeMenuItem
}) {

    const colors = useSelector(state => state.theme.colors)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const addField = () => {
        setFieldList(f => {
            const nf = [...f]
            nf.push({ isOpen: false, field_name: '', options: [] })
            return nf
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick()
        }
    }


    const removeField = (index) => {
        setFieldList(fields => (
            fields.filter((_, i) => i !== index)
        ))
    }

    const setFieldName = (val, index) => {
        setFieldList(fields =>
            fields.map((f, i) => (
                i === index ? { ...f, field_name: val } : f
            ))
        )
    }

    const addOption = (index) => {
        setFieldList(fields => {
            return fields?.map((field, i) => (
                i === index ? { ...field, options: [...field?.options, ''] } : field
            ))
        })
    }

    const removeOption = (index, jdex) => {
        setFieldList(fields =>
            fields.map((f, i) => (
                i !== index ? f : ({
                    ...f,
                    options: f?.options.filter((_, j) => j !== jdex)
                })
            ))
        )
    }

    const changeOptionName = (val, index, jdex) => {
        setFieldList(fields =>
            fields.map((f, i) => (
                i !== index ? f : (
                    {
                        ...f,
                        options: f?.options?.map((o, j) => (
                            j !== jdex ? o : val
                        ))
                    }
                )
            ))
        )
    }

    const reset = () => {
        setItemDescription('')
        setItemName('')
        setFieldList([])
    }

    const handleAddMenuItem = () => {
        if (itemName !== '') {
            addMenuItem(itemName, itemDescription, fieldList, handleClose)
        }
    }

    const handleEditMenuItem = () => {
        if (itemName !== '') {
            editMenuItem(itemId, itemName, itemDescription, fieldList, handleClose)
        }
    }

    const handleClick = () => {
        if (edit) {
            handleEditMenuItem()
        }
        else {
            handleAddMenuItem()
        }
    }

    const handleClose = () => {
        onClose()
        reset()
        setEdit(false)
    }

    const handleDelete = () => {
        removeMenuItem(itemId, handleClose)
        setDeleteOpen(false)
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent color={colors.primary} bg={colors.secondary}>
                    <ModalHeader>
                        <Flex align='center' gap={3} >
                            <Text fontSize='25px' as='b' color={colors.primary}>{edit ? 'Edit Menu Item' : 'Add Menu Item'}</Text>
                            <IconButton onClick={() => setDeleteOpen(true)} bg='transparent' fontSize='20px' color={colors.red} icon={<DeleteIcon />} />
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflow='hidden'>
                        <FormControl>
                            <FormLabel >Name</FormLabel>
                            <Input onKeyDown={handleKeyPress} value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input onKeyDown={handleKeyPress} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                        </FormControl>
                        <FormControl overflow='auto'>
                            <FormLabel>
                                <Flex gap={1} align='center'>
                                    <Text >Fields</Text>
                                    <IconButton color={colors.primary} onClick={addField} bg='transparent' fontSize='14px' icon={<FontAwesomeIcon icon={faPlus} />} />
                                </Flex>
                            </FormLabel>
                            <Flex width='100%' gap={2} direction='column'>
                                {fieldList.map((_, i) => (
                                    <Flex width='100%' direction='column' gap={2}>
                                        <Flex width='100%'>
                                            <IconButton onClick={() => removeField(i)} bg='transparent' color={colors.primary} icon={<FontAwesomeIcon icon={faTrash} />} />
                                            <InputGroup flex={1}>
                                                <Input onKeyDown={handleKeyPress} value={fieldList[i]?.field_name} onChange={(e) => setFieldName(e.target.value, i)} />
                                                <InputRightElement>
                                                    <IconButton onClick={() => addOption(i)} bg='transparent' color={colors.primary} icon={<FontAwesomeIcon icon={faPlus} />} />
                                                </InputRightElement>
                                            </InputGroup>
                                        </Flex>
                                        <FormControl pl='30px' pr='20px'>
                                            <Flex direction='column' gap={1}>
                                                {fieldList[i]?.options?.map((_, j) => (
                                                    <Flex width='100%'>
                                                        <IconButton onClick={() => removeOption(i, j)} bg='transparent' color={colors.primary} icon={<FontAwesomeIcon icon={faMinus} />} />
                                                        <Input onKeyDown={handleKeyPress} value={fieldList[i]?.options[j]} onChange={(e) => changeOptionName(e.target.value, i, j)} flex={1} />
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        </FormControl>
                                    </Flex>
                                ))}
                            </Flex>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleClick} bg={colors.primary} color={colors.secondary}>{edit ? 'Save Changes' : 'Add Item'}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <DeleteConfirmation isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} onDelete={handleDelete} header={`Delete "${itemName}"?`} body='DANGER: This Action Cannot Be Undone' />
        </>
    )
}