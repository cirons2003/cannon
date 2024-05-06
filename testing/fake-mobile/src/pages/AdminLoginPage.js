import {Box, Button, Input, Text} from '@chakra-ui/react'
import {useState} from 'react'
import useAdminLogin from '../custom hooks/useAdminLogin'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {login, logout, register, username: currentName} = useAdminLogin()

  const handleClick = ()=> {
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <Box>
        <Text>Admin Login Test Client</Text>
        <hr/>
        <Text>Logged in as {currentName}</Text>
        <Input required value = {username} onChange = {(e)=> setUsername(e.target.value)} placeholder = 'username'/>
        <Input required value = {password} onChange = {(e) => setPassword(e.target.value)} placeholder = 'password'/>
        <Button onClick = {handleClick}>login</Button>
        <br/>
        <Button onClick = {logout}>logout</Button>
      </Box>
    </>
  );
}