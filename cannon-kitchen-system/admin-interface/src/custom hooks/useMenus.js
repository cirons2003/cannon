import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"



const useMenus = () => {
    const baseURL = useSelector(state => state.proxy.serverURL)
    
    const [listOfMenus, setListOfMenus] = useState([])
    const [filteredListOfMenus, setFilteredListOfMenus] = useState([])

    const getMenus = async() => {
        try {
            const response = await axios.get(baseURL+'/menu/getMenus', {withCredentials: true})
            const fun  = response.data.list_of_menus
            setListOfMenus(fun)
            setFilteredListOfMenus(fun)
            console.log(response.data)
        } catch(err) {
            console.error(err)
        }
    }

    const filterMenus = (searchTerm) => {
        setFilteredListOfMenus(listOfMenus.filter((menu) => menu.name.toLowerCase().startsWith(searchTerm.toLowerCase())))
    }

    const createMenu = async(name, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/createMenu', {name: name}, {withCredentials: true})
            console.log(response.data)
            getMenus()
            successCallback()
        }catch(err) {
            console.error(err)
        }
    }

    const removeMenu = async(menuId, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/removeMenu', {menu_id: menuId}, {withCredentials: true})
            console.log(response.data)
            getMenus()
            successCallback()
        }catch(err) {
            console.error(err)
        }
    }

    const changeMenuName = async(menuId, name, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/changeMenuName', {menu_id: menuId, name: name}, {withCredentials: true})
            console.log(response.data)
            getMenus()
            successCallback()
        }catch(err) {
            console.error(err)
        }
    }

    const changeMenuItems = async(id, indices, successCallback) => {
        try {
            console.log(id, indices)
            const response = await axios.post(baseURL+'/menu/changeMenuItems', {menu_id: id, indices: indices}, {withCredentials: true})
            console.log(response.data)
            getMenus()
            successCallback()
        }catch(err) {
            console.error(err)
        }
    }

    const removeItemFromMenu = async(menuId, itemId, successCallback) => {
        try {
            const response = await axios.post(baseURL+'/menu/removeItemFromMenu', {menu_id: menuId, item_id: itemId}, {withCredentials: true })
            console.log(response.data)
            getMenus()
            successCallback()
        }catch(err) {
            console.error(err)
        }
    }

    return {getMenus, filteredListOfMenus, listOfMenus, createMenu, removeMenu, changeMenuName, changeMenuItems, removeItemFromMenu, filterMenus}
}


export default useMenus