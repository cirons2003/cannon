import { Button, Flex, FormControl, Icon, IconButton, Modal, ScrollView, Select, Text } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { OrderProps } from "../../../custom hooks/usePlaceOrder";

type MenuPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    item: Item | undefined;
};

export type Item = {
    name: string;
    description?: string;
    fields?: Field[];
};

export type Field = {
    field_name: string;
    options?: string[];
    placeOrder: (props: OrderProps) => void;
};

export const MenuPopup = (props: MenuPopupProps) => {
    const { isOpen, onClose, item } = props;
    const [selections, setSelections] = useState<{[key: string]: string}>({});

    const onSelectionChange = (fieldName: string, selectedOption: string) => {
        setSelections(sls => {
            const newSelections = {...sls};
            newSelections[fieldName] = selectedOption;
            return newSelections;
        });
    };

    const placeOrder = () => {
        
    }

    const canOrder = (): boolean => {
        if (!item?.fields?.length) 
            return true;
        else {
            let canOrderVal = true;
            item.fields.forEach((field) => {
                if (!selections?.[field.field_name]) {
                    canOrderVal = false;
                }
            })
            return canOrderVal;
        }
    }

    const handleClose = () => {
        onClose();
        setSelections({});
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <Modal.Content bg='background'>
                <Modal.Header bg='background' pb={0}>
                    <Flex direction="row" align='center' justify='space-between' >
                        <Text color='secondary' fontSize='md' fontFamily='primary' bold>Place an order</Text>
                        <IconButton onPress={handleClose} p={0} icon={<Icon as={MaterialCommunityIcons} name='window-close' color='primary' size={7} />} _pressed={{ background: 'transparent', opacity: 60 }} />
                    </Flex>
                </Modal.Header>
                <Modal.Body pt={0} bg='background'>
                    <ScrollView minHeight='200px'>
                        <Text fontSize='sm' color='primary' bold>
                            Order name:
                        </Text>
                        <Text fontSize='sm' color='primary' mb='sm'>
                            {item?.name}
                        </Text>
                        <Text fontSize='sm' color='primary' bold>
                            Customizations:
                        </Text>
                        <Text fontSize='xs' italic color='primary'>**All fields are required**</Text>
                        {item?.fields?.map((field, i) => (
                            <FormControl key={field.field_name}>
                                <FormControl.Label>
                                    <Text color='primary' italic>{field.field_name}</Text>
                                </FormControl.Label>
                                <Select id={field.field_name} mb='2px' borderRadius={20} borderColor={selections?.[field.field_name] ? 'secondary' : 'primary'} placeholder='none selected' color={selections?.[field.field_name] ? 'secondary' : 'primary'} placeholderTextColor='primary' onValueChange={(sl) => onSelectionChange(field.field_name, sl)}>
                                    {field.options?.map((option, j) => (
                                        <Select.Item key={option} label={option} value={option} />
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                    </ScrollView>
                </Modal.Body>
                <Modal.Footer bg='background'>
                    <Flex direction="row" justify="space-between" align='center'>
                        <Button onPress={handleClose} variant='primary' bg='transparent' _pressed={{ background: 'transparent', opacity: 60 }}>
                            <Text fontFamily='primary' fontSize='sm' color='primary' bold>
                                Cancel
                            </Text>
                        </Button>
                        <Button ml='sm' variant='primary' bg='secondary' _pressed={{ background: 'secondary', opacity: 60 }} disabled={!canOrder()} opacity={canOrder() ? 100 : 40}>
                            <Text fontFamily='primary' fontSize='sm' color='white' bold>
                                Order
                            </Text>
                        </Button>
                    </Flex>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};