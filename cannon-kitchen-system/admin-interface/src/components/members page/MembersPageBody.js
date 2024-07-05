import { Flex, Text } from "@chakra-ui/react";
import React from 'react'
import MemberRow from "./MemberRow";
import { useSelector } from "react-redux";


export default function MembersPageBody({ listOfMembers, openModal, openDelete }) {
    const colors = useSelector(state => state.theme.colors)

    if (!listOfMembers?.length) {
        return (
            <Flex w='full'>
                <Text color={colors.primary}>No members found</Text>
            </Flex>
        )
    }

    return (
        <Flex w='full' flex={1} direction='column' gap={2}>
            {listOfMembers?.map((member) => (
                <MemberRow key={member?.first_name} member={member} openChangePasswordModal={() => openModal(member?.email)} openDeleteModal={() => openDelete(member?.email)} />
            ))}
        </Flex>
    )
}