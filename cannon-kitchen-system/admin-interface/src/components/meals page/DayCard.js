import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useDateHandling from "../../custom hooks/useDateHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";


export default function DayCard({day}) {
    const colors = useSelector(state => state.theme.colors)
    const {getDayName} = useDateHandling()

    const startTime = '7:00'
    const endTime = '20:00'

    const numBlocks = (endTime.split(':')[0] - startTime.split(':')[0]) * 2 + (endTime.split(':')[1] / 30) - (startTime.split(':')[1]/ 30) + 2

    return (
        <Flex flex = {1} direction = 'column' minWidth = '150px' maxWidth = '300px' bg = {colors.secondary} height = '100%'>
            <Flex direction = 'column' align = 'center' width = 'center' justify = 'center' gap = '10px'>
                <Flex px = '3px' width = '100%' justify = 'space-between' align = 'center'>
                    <Text as = 'b' fontSize='20px'>{getDayName(day)}</Text>
                    <Flex>
                        <IconButton bg = 'transparent' _hover = {{backgroundColor: 'transparent', opacity: '70%'}} icon = {<FontAwesomeIcon icon = {faAdd}/>}/>
                    </Flex>
                </Flex>
                <Flex width = '100%' flex = {1} direction = 'column'> 
                    {Array.from({length: numBlocks}).map(()=>(
                        <Flex borderColor = {colors.primary} borderBottomWidth = '1px' width = '100%' height = {`${100/numBlocks}%`}>
                            <Text>12:00</Text>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}