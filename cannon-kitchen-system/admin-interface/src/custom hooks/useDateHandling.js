



const useDateHandling = () => {
    const weekDayMap = {
        '0': 'Sunday', 
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday'
    }

    const getDayName = (dayNum) => {
        return weekDayMap[dayNum]
    }

    return {getDayName}
}

export default useDateHandling