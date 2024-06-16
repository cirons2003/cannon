import { Avatar, Flex, Input, Text, VStack, Image, FormControl, IconButton, Icon } from "native-base";
import { useAppSelector } from "../../custom hooks/hooks";
import { useEffect, useRef, useState } from "react";
import mooseImage from '../../static/moose.jpg';
import { AntDesign } from '@expo/vector-icons';
import useUser from "../../custom hooks/useUser";


export default function ProfilePage() {
    const { firstName, lastName, description } = useAppSelector(state => state.user);
    const [newDescription, setNewDescription] = useState<string>('');
    const { changeDescription } = useUser();

    const onSubmit = () => {
        changeDescription({ description: newDescription });
        clear();
    }

    const clear = () => {
        setNewDescription('');
    }

    useEffect(() => {
        if (description) {
            setNewDescription(description);
        }
    }, [description])

    return (
        <Flex safeAreaTop bg='background' flex={1}>
            <Flex flex={1} >
                <VStack flex={1} alignItems='center'>
                    <Avatar borderWidth='4px' borderColor='primary' size='xl' mb='sm' source={mooseImage} />
                    <Text color='primary' fontSize='lg' fontFamily='primary' textAlign='center'>{firstName} {lastName}</Text>
                    <FormControl alignItems='center' mt='lg' px='xl' mb='lg' position='relative'>
                        <FormControl.Label >
                            <Text fontSize='sm' fontFamily='primary' color='secondary'>Special Request</Text>
                        </FormControl.Label>
                        <Input
                            value={description}
                            onChangeText={setNewDescription}
                            placeholder='This will be added to each of your orders...'
                            borderColor='secondary'
                            textAlign='start'
                            flexWrap='wrap'
                            multiline={true}
                            blurOnSubmit={true}

                        />
                        <Flex position='absolute' right='0px' bottom='-20px' alignItems='flex-end' style={{ transform: 'translateX(-30px)' }}>
                            <IconButton onPress={onSubmit} borderRadius='full' bg='primary' width='70px' py='4px' icon={<Icon as={AntDesign} name='save' color='secondary' />} />
                        </Flex>
                    </FormControl>
                </VStack>
            </Flex>
        </Flex>
    );
};