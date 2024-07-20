import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuth } from '../custom hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Loginpage() {

    const colors = useSelector(state => state.theme.colors)
    const orgname = useSelector(state => state.theme.organization.name)
    const inputStyle = { borderColor: colors.primary, color: colors.primary, fontSize: '15px', '&::placeholder': { color: colors.primary } }
    const { login, logout } = useAuth()

    const user = useSelector(state => state.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)
    const [feedback, setFeedback] = useState('')
    const clearRef = useRef(null)

    const reset = () => {
        setUsername('')
        setPassword('')
    }


    const handleLogin = () => {
        if (clearRef.current) {
            clearTimeout(clearRef.current)
        }
        if (password === '' || username === '') {
            setFeedback('Username and Password are required')
            clearRef.current = setTimeout(() => setFeedback(''), 3000)
        } else {
            login(username, password)
        }
    }


    return (
        <>
            {
                user ?
                    <Navigate to='/' />
                    :
                    <Flex justify='center' align='center' width='100vw' height='100vh' bg={colors.primary}>
                        <Flex py='40px' direction='column' minWidth='400px' width='25vw' height='70vh' bg={colors.secondary} borderRadius={20} justify='start' align='center' px='30px'>
                            <Flex direction='column' align='center' mb='10px'>
                                <Text as='b' color={colors.primary} fontSize='40px'>{orgname}</Text>
                                <Text as='i' color={colors.primary}>Admin Interface</Text>
                            </Flex>
                            <Flex direction='column' width='100%' flex={1} justify='space-around' >
                                <Flex direction='column' width='100%' gap='30px'>
                                    <Flex gap='10px' width='100%' direction='column' mb='20px' pos='relative' >
                                        <FormControl>
                                            <FormLabel>Username</FormLabel>
                                            <Input value={username} onChange={(e) => { setUsername(e.target.value) }} required placeholder='username...' sx={inputStyle} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Password</FormLabel>
                                            <Input value={password} onChange={(e) => { setPassword(e.target.value) }} type={hidePassword ? 'password' : 'text'} placeholder='password...' sx={inputStyle} />
                                        </FormControl>
                                        <Flex position='absolute' bottom='-40px' width='100%' justify='flex-end'>
                                            <Button _hover={{ backgroundColor: 'transparent' }} bg='transparent' color={colors.primary} onClick={() => setHidePassword(!hidePassword)}>{hidePassword ? 'show password' : 'hide password'}</Button>
                                        </Flex>
                                    </Flex>
                                    <Button _hover={{ opacity: '50%' }} onClick={handleLogin} color={colors.secondary} bg={colors.primary}>Log In</Button>
                                </Flex>
                                <Text as='b' color={feedback !== '' ? colors.red : 'transparent'}>"{feedback}"</Text>
                            </Flex>
                        </Flex>
                    </Flex>
            }
        </>

    )
}