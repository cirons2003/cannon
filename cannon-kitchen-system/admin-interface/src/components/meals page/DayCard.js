import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useDateHandling from "../../custom hooks/useDateHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";


export default function DayCard({ day, meals, openModal, openEditModal }) {
    const colors = useSelector(state => state.theme.colors)
    const { getDayName } = useDateHandling()

    const startTime = '7:00'
    const endTime = '22:30'

    const numBlocks = (endTime.split(':')[0] - startTime.split(':')[0]) * 2 + (endTime.split(':')[1] / 30) - (startTime.split(':')[1] / 30)

    const markingString = (index) => {
        const hoursPassed = parseInt(index / 2)
        const minutes = index % 2 === 0 ? '00' : '30'
        const currentHour = parseInt(startTime.split(':')[0]) + hoursPassed
        const formattedHour = ((currentHour) % 12 === 0) ? 12 : currentHour % 12
        const amPm = currentHour < 12 ? 'AM' : 'PM'
        return `${formattedHour}:${minutes} ${amPm}`
    }

    const computeTop = (start) => {
        const [hours, min] = start.split(':')
        const [shours, smin] = startTime.split(':')
        const diffMinutes = 60 * (hours - shours) + (min - smin)
        return (diffMinutes / 30) * 50
    }

    const computeHeight = (start, end) => {
        const [sh, sm] = start.split(':')
        const [eh, em] = end.split(':')
        const durationInMinutes = (eh - sh) * 60 + (em - sm)
        return (durationInMinutes / 30) * 50
    };


    const openEdit = (meal) => {
        openEditModal(meal?.meal_id, meal?.start_time, meal?.end_time, meal?.active_menu_id, meal?.name, meal?.order_padding, day)
    }

    const paddingPositioning = (pd) => {
        const h = `${Math.abs(pd) / 30 * 50}px`
        if (pd > 0) {
            return { height: h, bottom: '100%' }
        }
        else
            return { height: h, top: '100%' }
    }

    const formatTime = (time) => {
        const [h, m] = time.split(':')
        const timeFormat = `${h % 12}:${m}`
        const amPm = Math.floor(h / 12) === 0 ? 'AM' : 'PM'
        return `${timeFormat}${amPm}`
    }

    return (
        <Flex color={colors.primary} flex={1} direction='column' minWidth='150px' maxWidth='300px' bg={colors.secondary} height='100%'>
            <Flex direction='column' align='center' width='center' justify='center' gap='10px'>
                <Flex px='3px' width='100%' justify='space-between' align='center' >
                    <Text as='b' fontSize='20px'>{getDayName(day)}</Text>
                    <Flex>
                        <IconButton onClick={() => openModal(day)} bg='transparent' _hover={{ backgroundColor: 'transparent', opacity: '70%' }} icon={<FontAwesomeIcon color={colors.primary} icon={faAdd} />} />
                    </Flex>
                </Flex>
                <Flex width='100%' flex={1} direction='column' >
                    <Flex width='100%' height='100%' direction='column' pos='relative'>
                        {Array.from({ length: numBlocks }).map((_, index) => (
                            <Flex key={index} borderColor={colors.primary} borderBottomWidth='1px' width='100%' height='50px'>
                                <Text color={colors.primary} >{markingString(index)}</Text>
                            </Flex>
                        ))}
                        {meals?.map((meal, index) => (
                            <Flex justify='center' align='center' gap={2} key={index} direction='column' _hover={{ opacity: '70%', cursor: 'pointer', backgroundColor: colors.primary }} onClick={() => openEdit(meal)} opacity='90%' py='10px' alignItems='center' backgroundColor={colors.primary} width='100%' height={`${computeHeight(meal.start_time, meal.end_time)}px`} pos='absolute' top={`${computeTop(meal.start_time)}px`}>
                                <Flex width='100%' overFlo w='hidden' justify='center'>
                                    <Text textAlign='center' isTruncated overflow='hidden' fontSize='15px' color='white' as='b'>{meal?.name}</Text>
                                </Flex>
                                <Text color='white' as='b'>
                                    {formatTime(meal.start_time)}
                                    -
                                    {formatTime(meal.end_time)}
                                </Text>
                                <Text color={colors.secondary} as='b'>
                                    {meal?.active_menu_present ? `Menu: ${meal?.active_menu_name}` : 'No Menu Selected'}
                                </Text>
                                {(meal?.order_padding > 5 || meal?.order_padding < -5) && <Flex justify='center' align='center' pos='absolute' bg={colors.primary} opacity='50%' borderColor={colors.secondary} sx={paddingPositioning(meal?.order_padding)} borderWidth='3px' width='100%'>
                                    <Text as='b' color='white'>Padding: {Math.abs(meal?.order_padding)} minutes</Text>
                                </Flex>}
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}