import { Flex, Text } from "@chakra-ui/react";
import React from 'react'
import MemberRow from "./MemberRow";


export default function MembersPageBody({ listOfMembers, openModal, openDelete }) {
    return (
        <Flex w='full' flex={1} direction='column' gap={2}>
            {listOfMembers?.map((member) => (
                <MemberRow key={member?.first_name} member={member} openChangePasswordModal={() => openModal(member?.email)} openDeleteModal={() => openDelete(member?.email)} />
            ))}
        </Flex>
    )
}