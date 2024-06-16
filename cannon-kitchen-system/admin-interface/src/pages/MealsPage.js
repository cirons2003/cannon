import { Flex } from "@chakra-ui/react";
import MealsPageTopBar from "../components/meals page/MealsPageTopBar";
import Days from "../components/meals page/Days";
import NewMealPopup from "../components/meals page/NewMealPopup";
import useMenus from '../custom hooks/useMenus'
import { useEffect, useState } from "react";
import useMealSchedule from "../custom hooks/useMealSchedule";



export default function MealsPage() {
    const { getMenus, listOfMenus, filteredListOfMenus, filterMenus } = useMenus()
    const { getMealSchedule, mealSchedule, addMealToSchedule, editMealInSchedule, removeMealFromSchedule } = useMealSchedule()
    const [modalOpen, setModalOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [mealId, setMealId] = useState(-1)
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [activeMenuId, setActiveMenuId] = useState(-1)
    const [padding, setPadding] = useState(0)
    const [mealName, setMealName] = useState('')
    const [day, setDay] = useState(0)


    useEffect(() => {
        const clear = setTimeout(() => { getMenus(); getMealSchedule() }, 300)
        return () => clearTimeout(clear)
    }, [])

    const closeModal = () => {
        setModalOpen(false)
        setEdit(false)
        setMealId(-1)
        setStartTime('')
        setEndTime('')
        setActiveMenuId(-1)
        setMealName('')
        setPadding(0)
    }

    const openModal = (day) => {
        setDay(day)
        setModalOpen(true)
    }

    const openEditModal = (id, start, end, menuId, nm, pd, day) => {
        setEdit(true)
        setMealId(id)
        setStartTime(start)
        setEndTime(end)
        setActiveMenuId(menuId)
        setMealName(nm)
        setPadding(pd)
        setDay(day)
        setModalOpen(true)
    }

    return (
        <Flex direction='column' align='center' flex={1}>
            <MealsPageTopBar />
            <Days mealSchedule={mealSchedule} openModal={openModal} openEditModal={openEditModal} />
            <NewMealPopup listOfMenus={listOfMenus} isOpen={modalOpen} onClose={closeModal} edit={edit} mealId={mealId}
                startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
                activeMenuId={activeMenuId} setActiveMenuId={setActiveMenuId} padding={padding} setPadding={setPadding}
                name={mealName} setName={setMealName} filteredListOfMenus={filteredListOfMenus} day={day} filterMenus={filterMenus}
                addMealToSchedule={addMealToSchedule} editMealInSchedule={editMealInSchedule} removeMealFromSchedule={removeMealFromSchedule}
            />
        </Flex>
    )
}