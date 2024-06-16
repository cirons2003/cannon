


import { Button, Flex, FormControl, VStack, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useDateHandling from "../../custom hooks/useDateHandling";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from "../DeleteConfirmation";

export default function NewMealPopup({ isOpen, onClose, listOfMenus, edit, day, mealId, startTime, endTime, activeMenuId, padding,
    setStartTime, setEndTime, setActiveMenuId, setPadding, name, setName, filteredListOfMenus, filterMenus, addMealToSchedule, editMealInSchedule, removeMealFromSchedule
}) {

    const colors = useSelector(state => state.theme.colors)
    const { getDayName } = useDateHandling()

    const [searchTerm, setSearchTerm] = useState('')
    const [showMenus, setShowMenus] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const isShowing = (menu) => {
        return filteredListOfMenus.some((men) => menu?.menu_id === men.menu_id)
    }

    useEffect(() => {
        const clear = setTimeout(() => {
            filterMenus(searchTerm)
        }, 300)
        return () => clearTimeout(clear)
    }, [searchTerm, filterMenus])


    const onSave = () => {
        if (edit) {
            onEdit()
        }
        else {
            onAdd()
        }
    };

    const onEdit = () => {
        if (validate())
            editMealInSchedule(mealId, day, name, startTime, endTime, padding, activeMenuId, onClose)
    }

    const onAdd = () => {
        if (validate())
            addMealToSchedule(day, name, startTime, endTime, padding, activeMenuId, onClose)
    }

    const validate = () => {
        if (!startTime || !endTime || !name) {
            alert('name and times are required')
            return false
        }
        if (padding && padding !== 0 && padding < 10 && padding > -10) {
            alert('padding must be larger than 10 or less than -10')
            return false
        }
        const [sHours, sMinutes] = startTime.split(':')
        const [eHours, eMinutes] = endTime.split(':')
        console.log(sHours, sMinutes, eHours, eMinutes)
        console.log()
        if (sHours >= eHours || ((parseInt(eHours, 10) - parseInt(sHours, 10) < 2) && (parseInt(eMinutes, 10) + 60 - parseInt(sMinutes, 10) < 60))) {
            alert('end time must be at least one hour after start time')
            return false
        }
        return true
    }

    const isActive = (menu) => {
        return menu?.menu_id === activeMenuId
    }

    const newMenu = (menu) => {
        setActiveMenuId(menu?.menu_id)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSave()
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent bg={colors.secondary} color={colors.primary}>
                <ModalHeader>
                    <Flex direction='column'>
                        <Text mb='10px' as='b'>{getDayName(day)}</Text>
                        <hr />
                        <Flex width='100%' pr='10px' justify='space-between'>
                            <Text as='b' mt='10px'>{edit ? `Edit Meal?` : `New Meal`}</Text>
                            <IconButton onClick={() => setDeleteOpen(true)} icon={<FontAwesomeIcon icon={faTrash} />} bg='transparent' color={colors.red} size={9} _hover={{ backgroundColor: 'transparent', opacity: '70%' }} />
                        </Flex>
                        <Text fontSize='12px' >(Meal times should be relative to local Princeton time)</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={3}>
                        <FormControl>
                            <FormLabel>Meal Name</FormLabel>
                            <Input onKeyDown={handleKeyPress} placeholder="Meal Name" value={name} onChange={e => setName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Start Time</FormLabel>
                            <Input onKeyDown={handleKeyPress} type="time" placeholder="Start Time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>End Time</FormLabel>
                            <Input onKeyDown={handleKeyPress} type="time" placeholder="End Time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Padding</FormLabel>
                            <Input onKeyDown={handleKeyPress} placeholder="Padding (minutes)" value={padding} onChange={e => setPadding(e.target.value)} />
                        </FormControl>
                        <Flex width='100%' align='center' justify={!showMenus ? 'start' : 'space-around'} gap='10px'>
                            <Flex onClick={() => { setSearchTerm(''); setShowMenus(!showMenus) }} _hover={{ backgroundColor: 'transparent', opacity: '70%', cursor: 'pointer' }} gap={2} align='center'>
                                <Text as='b' fontSize='20px  '>Choose a Menu </Text>
                                {showMenus ?
                                    <IconButton icon={<FontAwesomeIcon icon={faChevronUp} />} bg='transparent' size={3} color={colors.primary} _hover={{ backgroundColor: 'transparent', opacity: '70%' }} />
                                    :
                                    <IconButton icon={<FontAwesomeIcon icon={faChevronDown} />} bg='transparent' size={3} color={colors.primary} _hover={{ backgroundColor: 'transparent', opacity: '70%' }} />
                                }
                            </Flex>
                            {showMenus && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} size={5} />}
                        </Flex>

                        {showMenus && <Flex px='25px' direction='column' alignItems='stretch' overflow='auto' gap={1} w='full' >
                            {listOfMenus?.map((menu, index) => (
                                <Flex hidden={!isShowing(menu)} _hover={{ backgroundColor: colors.primary, opacity: '70%', color: colors.secondary, cursor: 'pointer' }} color={isActive(menu) ? colors.secondary : colors.primary} key={index}
                                    borderRadius={20} borderColor={colors.primary} borderWidth={1} px={2} bg={isActive(menu) ? colors.primary : colors.secondary} justify='space-between'
                                    onClick={() => { setSearchTerm(''); newMenu(menu) }}>
                                    <Text as='i' >{menu.name}</Text>
                                    <Text>{isActive(menu) ? 'Selected' : ''}</Text>
                                </Flex>
                            ))}
                        </Flex>}
                    </VStack>
                    <DeleteConfirmation header='Remove Meal from Schedule?' body='DANGER: This cannot be undone' onClose={() => setDeleteOpen(false)} isOpen={deleteOpen} onDelete={() => { setDeleteOpen(false); removeMealFromSchedule(mealId, onClose) }} />
                </ModalBody>
                <ModalFooter>
                    <Button _hover={{ opacity: '70%', backgroundColor: 'transparent' }} onClick={onClose} bg='transparent'>
                        Cancel
                    </Button>
                    <Button _hover={{ opacity: '70%', backgroundColor: colors.primary }} onClick={onSave} ml={3} bg={colors.primary} color={colors.secondary}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
