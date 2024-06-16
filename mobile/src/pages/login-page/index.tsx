import { Button, Center, Flex, FormControl, Input, Text, VStack, useTheme } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../../custom hooks/useAuth";
import { useAppSelector } from "../../custom hooks/hooks";

export default function LoginPage() {
    const theme = useTheme();
    const { login, emailError, passwordError, loading, logout } = useAuth();
    const firstName = useAppSelector(state => state.user.firstName);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleClick = () => {
        if (email !== '' && password !== '') {
            login({ email: email, password: password, onSuccess: () => alert('Nice!') });
            resetFields();
        }
    };  

    const resetFields = () => {
        setEmail('');
        setPassword('');
    }; 

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <Center flex={1} >
                <VStack p='lg' alignItems='center' width='300px' flexShrink = {1} bg='secondary' borderRadius='xl' >
                    <Text mb='sm' fontSize='lg' fontFamily='primary' color='primary'>Cannon App {firstName}</Text>
                    <FormControl isInvalid={emailError !== ''}>
                        <FormControl.Label><Text color='primary' fontFamily='primary'>Email</Text></FormControl.Label>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            bg='transparent'
                            borderColor='primary'
                            borderWidth='2px'
                            placeholderTextColor='primary'
                            color='primary'
                        />
                        <FormControl.ErrorMessage leftIcon={<MaterialIcons color={theme.colors.error} name='error-outline' />} >
                            <Text color='error'>{emailError}</Text>
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={passwordError !== ''}>
                        <FormControl.Label><Text color='primary' fontFamily='primary'>Password</Text></FormControl.Label>
                        <Input
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            autoCapitalize="none"
                            bg='transparent'
                            borderColor='primary'
                            borderWidth='2px'
                            placeholderTextColor='primary'
                            color='primary'
                            secureTextEntry
                        />
                        <FormControl.ErrorMessage leftIcon={<MaterialIcons color={theme.colors.error} name='error-outline' />} >
                            <Text color='error'>{passwordError}</Text>
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button onPress={handleClick} mt='xl' mb = 'md' minWidth='50%' bg='primary'><Text fontFamily='primary' color='secondary' borderRadius='lg'>Sign In</Text></Button>
                </VStack>
            </Center>
        </SafeAreaView>
    );
};