import { Avatar, Flex, Input, Text, VStack, Image, FormControl, IconButton, Icon } from "native-base";
import { useAppSelector } from "../../custom hooks/hooks";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import useUser from "../../custom hooks/useUser";
import mooseImage from '../../static/moose.png';
import { AlertPopup } from "../../components/alert-popup";

export default function ProfilePage() {
    const { firstName, lastName, description } = useAppSelector(state => state.user);
    const [newDescription, setNewDescription] = useState<string>('');
    const { changeDescription, error, confirmed } = useUser();

    const onSubmit = () => {
        if (newDescription !== description) {
            changeDescription({ description: newDescription });
        }
    }

    const clear = () => {
        setNewDescription('');
    }

    const [oldDescription, setOldDescription] = useState<string>('');

    if (description !== oldDescription && description !== undefined) {
        setOldDescription(description);
        setNewDescription(description);
    }

    return (
        <Flex safeAreaTop bg='background' flex={1}>
            <Flex flex={1} position='relative'>
                <VStack flex={1} alignItems='center'>
                    <Avatar borderWidth='4px' borderColor='primary' size='xl' mb='sm' source={mooseImage} />
                    <Text color='primary' fontSize='lg' fontFamily='primary' textAlign='center'>{firstName} {lastName}</Text>
                    <FormControl alignItems='center' mt='lg' px='xl' mb='lg' position='relative'>
                        <FormControl.Label >
                            <Text fontSize='sm' fontFamily='primary' color='secondary'>Special Request</Text>
                        </FormControl.Label>
                        <Input
                            value={newDescription}
                            onChangeText={setNewDescription}
                            placeholder='This will be added to each of your orders...'
                            borderColor='secondary'
                            textAlign='start'
                            flexWrap='wrap'
                            multiline={true}
                            blurOnSubmit={true}
                            color='secondary'
                        />
                        <Flex position='absolute' right='0px' bottom='-20px' alignItems='flex-end' style={{ transform: 'translateX(-30px)' }}>
                            <IconButton onPress={onSubmit} borderRadius='full' bg='primary' width='70px' py='4px' icon={<Icon as={AntDesign} name='save' color='secondary' />} />
                        </Flex>
                    </FormControl>
                </VStack>
                {confirmed && <AlertPopup iconVariant="success" alertText="Updated Successfully!" fontSize="sm" color='primary' shiftY={5} />}
                {error && <AlertPopup iconVariant="error" alertText="An error occured" color='error' shiftY={5} fontSize="sm" />}
            </Flex>
        </Flex>
    );
};