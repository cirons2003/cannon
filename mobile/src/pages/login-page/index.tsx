import { Button, Center, Flex, FormControl, Input, Text, VStack, useTheme } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "../../custom hooks/useAuth";
import { useAppSelector } from "../../custom hooks/hooks";
import { useFlash } from "../../custom hooks/useFlash";
import useUser from "../../custom hooks/useUser";

export default function LoginPage() {
    const theme = useTheme();
    const { login, isError, clearError, loading, logout } = useAuth();
    const { resetPassword, changePassword } = useUser()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('')

    const [resettingPassword, setResettingPassword] = useState<boolean>(false)
    const [enterCode, setEnterCode] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [errorFlashed, setErrorFlashed] = useState(false)
    const { flash: flashError, cleanUp } = useFlash(setErrorFlashed, () => { setErrorMessage('') })

    useEffect(() => {
        return () => cleanUp()
    }, [])

    const handleClick = async () => {
        if (resettingPassword) {
            handleResetPassword()
        } else if (enterCode) {
            handleChangePassword()
        } else {
            handleLogin()
        }
    }

    const handleLogin = async () => {
        clearError()
        setIsLoading(true)
        if (email === '' || password === '') {
            setErrorMessage('Email and Password are required')
            flashError(3000)
            setIsLoading(false)
            return
        }

        const success = await login({ email: email, password: password, onSuccess: undefined });
        if (!success) {
            setErrorMessage('Login Failed')
            flashError(3000)
        } else {
            resetFields()
        }
        setIsLoading(false)
    }

    const handleResetPassword = async () => {
        clearError()
        if (email === '') {
            setErrorMessage('Please enter your email')
            flashError(3000)
        }

        setIsLoading(true)
        const success = await resetPassword(email)
        setIsLoading(false)

        if (!success) {
            setErrorMessage('Email not found')
            flashError(3000)
        } else {
            setEnterCode(true)
            setResettingPassword(false)
            setErrorMessage('Email sent, check your inbox')
            setEmail('')
        }
    }

    const handleChangePassword = async () => {
        if (email === '' || password === '') {
            setErrorMessage('Please enter both fields')
            flashError(3000)
        } else {
            const success = await changePassword(email, password)

            if (!!success) {
                setErrorMessage('Success!')
                flashError(3000)
                flashError(5000)
                const clear = setTimeout(() => { leaveCodeEntering(); clearTimeout(clear) }, 2000)
            } else {
                setErrorMessage('Please Try again')
                flashError(3000)
            }
        }
    }

    const resetFields = () => {
        setEmail('');
        setPassword('');
    };

    const leaveCodeEntering = () => {
        setEnterCode(false)
        resetFields()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <Center flex={1} >
                <VStack p='lg' alignItems='center' width='300px' flexShrink={1} bg='tertiary' borderRadius='xl' >
                    <Text mb='sm' fontSize='lg' fontFamily='primary' color='primary'>{enterCode ? 'Check email' : `${resettingPassword ? 'Enter Email' : 'Cannon App'}`}</Text>
                    <FormControl>
                        <FormControl.Label><Text color='primary' fontFamily='primary'>{enterCode ? 'Temporary Password' : 'Email'}</Text></FormControl.Label>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            placeholder={enterCode ? 'Enter password from email' : 'Enter your email'}
                            autoCapitalize="none"
                            bg='transparent'
                            borderColor='primary'
                            borderWidth='2px'
                            placeholderTextColor='primary'
                            color='primary'
                        />
                    </FormControl>
                    {!resettingPassword && <FormControl>
                        <FormControl.Label><Text color='primary' fontFamily='primary'>{enterCode ? 'New Password' : 'Password'}</Text></FormControl.Label>
                        < Input
                            value={password}
                            onChangeText={setPassword}
                            placeholder={enterCode ? 'Enter your new password' : "Enter your password"}
                            autoCapitalize="none"
                            bg='transparent'
                            borderColor='primary'
                            borderWidth='2px'
                            placeholderTextColor='primary'
                            color='primary'
                            secureTextEntry={!enterCode}
                        />
                    </FormControl>}
                    <Text mt='sm' textAlign='center' fontSize='xs' color={errorFlashed ? `${(errorMessage !== 'Email sent, check your inbox' && errorMessage !== 'Success!') ? 'error' : 'green.800'}` : 'transparent'}>{errorMessage}</Text>
                    <Button onPress={() => { setResettingPassword(!resettingPassword); leaveCodeEntering() }} p={0}><Text color='green.700'>{resettingPassword ? 'Back to login' : 'Reset Password'}</Text></Button>
                    <Button isLoading={isLoading} onPress={handleClick} mt='sm' mb='md' minWidth='50%' bg='primary'><Text fontFamily='primary' color='secondary' borderRadius='lg'>{resettingPassword ? 'Reset Password' : `${enterCode ? 'Change Password' : 'Sign In'}`}</Text></Button>
                </VStack>
            </Center>
        </SafeAreaView >
    );
};