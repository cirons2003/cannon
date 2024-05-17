import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const useMealLibrary = () => {
    const baseURL = useSelector(state => state.proxy.serverURL)

    const [listOfMenuItems, setListOfMenuItems] = useState([])
    const [filteredListOfMenuItems, setFilteredListOfMenuItems] = useState([])

    const getMealLibrary = async() => {
        try {
            const response = await axios.get(baseURL + '/menu/getMealLibrary', {withCredentials: true})
            const items = response.data.listOfMenuItems.sort((a, b) => (a.name.localeCompare(b.name)))
            setListOfMenuItems(items)
            setFilteredListOfMenuItems(items)
        }catch(err) {
            console.error(err)
        }
    }

    const filterItems = (searchTerm) => {
        setFilteredListOfMenuItems(listOfMenuItems.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase())).sort((a, b) => (a.name.localeCompare(b.name))))
    }


    const addMenuItem = async(name, description, fields, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/addMenuItem', {name: name, description: description, fields: fields}, {withCredentials: true})
            console.log(response.data)
            successCallback()
            getMealLibrary()
        }catch(err) {
            console.error(err)
        }
    }

    const editMenuItem = async(itemId, name, description, fields, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/editMenuItem', {itemId: itemId, name: name, description: description, fields: fields}, {withCredentials: true})
            console.log(response.data)
            successCallback()
            getMealLibrary()
        }catch(err) {
            console.error(err)
        }
    }

    const removeMenuItem = async(itemId, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/removeMenuItem', {itemId: itemId}, {withCredentials: true})
            console.log(response.data)
            successCallback()
            getMealLibrary()
        }catch(err) {
            console.error(err)
        }
    }

    return {filteredListOfMenuItems, listOfMenuItems, getMealLibrary, addMenuItem, editMenuItem, removeMenuItem, filterItems}
}

export default useMealLibrary