import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import MembersPageHeader from "../components/members page/MembersPageHeader.jsx";
import MembersPageBody from "../components/members page/MembersPageBody.js";
import DeleteConfirmation from "../components/DeleteConfirmation.js";
import MembersPagePopup from "../components/members page/MembersPagePopup.js";
import { useMembers } from "../custom hooks/useMembers.js";


export default function MembersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { getMembers, filterMembers, filteredMemberList: memberList, addMember, changePassword, removeMember } = useMembers();
    const [modalOpen, setModalOpen] = useState(false);
    const [isAddModal, setIsAddModal] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(() => {
        const clear = setTimeout(() => getMembers(), 300)
        return () => clearTimeout(clear);
    }, [])

    useEffect(() => {
        const clear = setTimeout(() => filterMembers(searchTerm), 200)
        return () => clearTimeout(clear)
    }, [searchTerm])

    const openAddModal = () => {
        setIsAddModal(true);
        setModalOpen(true);
    }

    const openChangeModal = (email) => {
        setIsAddModal(false);
        setModalOpen(true);
        setUserEmail(email);
    }

    const closeModal = () => {
        setModalOpen(false);
        setUserEmail('')
    }

    const openDelete = (email) => {
        setUserEmail(email)
        setDeleteOpen(true)
    }

    const closeDelete = () => {
        setDeleteOpen(false)
        setUserEmail('')
    }

    const handleDelete = () => {
        removeMember(userEmail, closeDelete)
    }

    return (
        <Flex direction='column' h='full' w='full'>
            <MembersPageHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} openModal={openAddModal} />
            <MembersPageBody listOfMembers={memberList} openModal={openChangeModal} openDelete={openDelete} />
            <DeleteConfirmation />
            <MembersPagePopup isOpen={modalOpen} onClose={closeModal} addModal={isAddModal} addMember={addMember} changePassword={changePassword} userEmail={userEmail} />
            <DeleteConfirmation isOpen={deleteOpen} onClose={closeDelete} header={`Delete ${userEmail}?`} body='This cannot be undone' onDelete={handleDelete} />
        </Flex>
    );
};
