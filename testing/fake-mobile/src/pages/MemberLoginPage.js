import {Box, Button, Input, Text} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import useMemberLogin from '../custom hooks/useMemberLogin'

export default function MemberLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const[loggedIn, setLoggedIn] = useState(false)

  const {login, logout, register, email: currentName, secret, secretMessage, setSecretMessage} = useMemberLogin()

  useEffect(()=> {
    const access = JSON.parse(localStorage.getItem('access_token'))
    console.log('mount', access)
    if (access) {
        setLoggedIn(true)
    }
  },[])

  const showRegister = false

    const reset = () => {
        setEmail('')
        setPassword('')
        setFirstName('')
        setLastName('') 
        setSecretMessage('')
    }

  const handleClick = ()=> {
    if (showRegister)
        register(email, password, firstName, lastName)
    else
        login(email, password)
    reset()
  }

  const handleLogout = () =>{
    logout()
    reset()
  }

  const accessSecret = () => {
    secret()
  }

  return (
    <>
      <Box>
        <Text>Member Login Test Client</Text>
        <hr/>

        <Text>Logged in ? {loggedIn ? 'yes':'no'}</Text>
        <Input required value = {email} onChange = {(e)=> setEmail(e.target.value)} placeholder = 'email'/>
        <Input required value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'password'/>
        {showRegister && <Box>
            <Input required value = {firstName} onChange = {(e)=> setFirstName(e.target.value)} placeholder = 'first name'/>
            <Input required value = {lastName} onChange = {(e) => setLastName(e.target.value)} placeholder = 'last name'/>
        </Box>}
        <Button onClick = {handleClick}>login</Button>
        <br/>
        <Button onClick = {handleLogout}>logout</Button>
        <hr/>
        <Button onClick = {accessSecret}>Secret Button</Button>
        <Text>Secret Message: {secretMessage}</Text>
      </Box>
    </>
  );
}