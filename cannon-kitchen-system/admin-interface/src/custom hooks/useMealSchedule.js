import axios from "axios"
import { act, useState } from "react"
import { useSelector } from "react-redux"



const useMealSchedule = () => {
    const baseURL = useSelector(state => state.proxy.serverURL)

    const [mealSchedule, setMealSchedule] = useState([])

    const getMealSchedule = async() => {
        try {
            const response = await axios.get(baseURL + '/menu/getMealSchedule', {withCredentials: true })
            console.log(response.data)
            setMealSchedule(response.data.meal_schedule)
        }catch(err) {
            console.error(err)
        }
    }

    const addMealToSchedule = async(day, name, startTime, endTime, padding, activeMenuId, successCallback) => {
        try {
            const response = await axios.post(baseURL + '/menu/addMealToSchedule', {day_of_the_week: day, name: name, start_time: startTime, end_time: endTime, order_padding: parseInt(padding, 10), active_menu_id: activeMenuId}, {withCredentials: true})
            console.log(response.data)
            getMealSchedule()
            successCallback()
        }catch(err) {
            console.error(err) 
        }
    }
    const editMealInSchedule = async(mealId, day, name, startTime, endTime, padding, activeMenuId, successCallback) => {
        try {
            const response = await axios.post(baseURL + '/menu/editMealInSchedule', {meal_id: mealId, day_of_the_week: day, name: name, start_time: startTime, end_time: endTime, order_padding: parseInt(padding, 10), active_menu_id: activeMenuId}, {withCredentials: true})
            console.log(response.data)
            getMealSchedule()
            successCallback()
        }catch(err) {
            console.error(err) 
        }
    }

    const removeMealFromSchedule = async(mealId, successCallback) => {
        try {
            const response = await axios.post(baseURL + '/menu/removeMealFromSchedule', {meal_id: mealId}, {withCredentials: true})
            console.log(response.data)
            getMealSchedule()
            successCallback()
        }catch(err) {
            console.error(err)
        }
    }

    return {getMealSchedule, mealSchedule, addMealToSchedule, editMealInSchedule, removeMealFromSchedule}
}

export default useMealSchedule