import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import { useSelector } from "react-redux";

export default function MemberRow({ member, openChangePasswordModal, openDeleteModal }) {
    const colors = useSelector(state => state.theme.colors);
    return (
        <Flex w='95%' minH='50px' bg={colors.secondary} borderRadius={20} px={4} align='center' wrap='wrap'>
            <Flex gap='5px' align='center' ml={4} borderRadius={20} bg={colors.primary} px={2} textAlign='center'>
                <Text as='b' color={colors.secondary} fontSize={20}>{member.first_name} {member.last_name}</Text>
            </Flex>
            <Flex gap='5px' align='center' ml={10}>
                <Text as='b' color={colors.primary} fontSize={20}>Email: </Text>
                <Text as='i' color={colors.primary} fontSize={20}>{member.email}</Text>
            </Flex>
            <Flex flex={1} justify='flex-end' pr={5} align='center' gap='20px'>
                {/*<Button onClick={openChangePasswordModal} bg={colors.primary}>
                    <Text color={colors.secondary}>Change Password</Text>
                </Button>*/}
                <IconButton size={12} onClick={openDeleteModal} _hover={{ backgroundColor: 'transparent', opacity: '70%' }} icon={<FontAwesomeIcon icon={faTrash} />} bg='transparent' color={colors.red} />
            </Flex>
        </Flex >
    )
}