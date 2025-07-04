import { ValuesProps } from "../components/Counter/Counter"


export const getValuesFromLocalStorage  = (): ValuesProps => {

    try {
        let minValueFromLS = localStorage.getItem('minValueKey')
        let maxValueFromLS = localStorage.getItem('maxValueKey')
        let stepValueFromLS = localStorage.getItem('stepValueKey')
        if (minValueFromLS && maxValueFromLS && stepValueFromLS) {
            return ({
                minValue: JSON.parse(minValueFromLS),
                maxValue: JSON.parse(maxValueFromLS),
                stepValue: JSON.parse(stepValueFromLS)
            })
        }  
    } catch {}
        return ({
            minValue: 0,
            maxValue: 5,
            stepValue: 1
        })
    }


export const getCountFromLocalStorage = () => {
    try {
        let countFromLS = localStorage.getItem('countKey')
        return countFromLS ? JSON.parse(countFromLS) : 0
    } catch {
        return 0
    }
    
    
}

export const setValuesToLocalStorage = (minValue:number, maxValue:number, stepValue: number) => {
    localStorage.setItem('minValueKey', JSON.stringify(minValue))
    localStorage.setItem('maxValueKey', JSON.stringify(maxValue))
    localStorage.setItem('stepValueKey', JSON.stringify(stepValue))
}
export const setCountToLocalStorage = (count: number | null) => {
    localStorage.setItem('countKey', JSON.stringify(count))
}




