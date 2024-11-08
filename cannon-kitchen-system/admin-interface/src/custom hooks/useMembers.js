import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useMembers = () => {
    const baseUrl = useSelector((state) => state.proxy.serverURL) + '/admin';
    const [memberList, setMemberList] = useState([]);
    const [filteredMemberList, setFilteredMemberList] = useState([]);

    const getMembers = async () => {
        try {
            const response = await axios.get(baseUrl + '/getMembers', {
                withCredentials: true,
            });
            const val = response.data.memberList;
            setMemberList(val);
            setFilteredMemberList(val);
        } catch (err) {
            console.error(err);
        }
    };

    const addMember = async (firstName, lastName, email, onSuccess) => {
        try {
            await axios.post(
                baseUrl + '/addMember',
                { first_name: firstName, last_name: lastName, email: email },
                { withCredentials: true },
            );
            getMembers();
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    const changePassword = async (email, newPassword, onSuccess) => {
        try {
            const response = await axios.post(
                baseUrl + '/changePassword',
                { email: email, new_password: newPassword },
                { withCredentials: true },
            );
            console.log(response.data);
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    const removeMember = async (email, onSuccess) => {
        try {
            await axios.post(
                baseUrl + '/removeMember',
                { email: email },
                { withCredentials: true },
            );
            getMembers();
            onSuccess();
        } catch (err) {
            console.error(err);
        }
    };

    const filterMembers = (searchTerm) => {
        if (!searchTerm) {
            setFilteredMemberList(memberList);
        } else {
            const filteredList = memberList?.filter(
                (member) =>
                    member?.first_name
                        ?.toLowerCase()
                        .startsWith(searchTerm.toLowerCase()) ||
                    member?.last_name
                        ?.toLowerCase()
                        .startsWith(searchTerm.toLowerCase()) ||
                    member?.email
                        ?.toLowerCase()
                        .startsWith(searchTerm.toLowerCase()),
            );
            setFilteredMemberList(filteredList);
            console.log(filteredMemberList.length);
        }
    };

    return {
        getMembers,
        filterMembers,
        filteredMemberList,
        addMember,
        changePassword,
        removeMember,
    };
};
