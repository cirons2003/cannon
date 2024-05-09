import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";


export default function Fields({fields}) {
    return (
        <Accordion allowMultiple>
            {fields.map((f,i)=>(
                <AccordionItem>
                    <AccordionButton>
                        <Box flex = {1} textAlign='left'>
                            {f?.field_name ? f.field_name : `field ${i}`}
                        </Box>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel>
                        {f?.options ? f.options.map((option, i)=>(
                            <Text>{option}</Text>
                        )) :<></>}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    )
}