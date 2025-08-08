import { ChangeEvent, useMemo, useState } from "react";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { getCountFromLocalStorage, getValuesFromLocalStorage, setCountToLocalStorage, setValuesToLocalStorage } from "../../utils/localStorageService";

const  MIN_LIMIT_VALUE:number = 0 
const  MAX_LIMIT_VALUE:number = 500 
const  MIN_STEP_VALUE:number = 1 

export type ValuesProps = {
    minValue: number 
    maxValue: number
    stepValue: number 
}

type MessageProps = "enter values and press 'set'" | "incorrect value!" | null

export const Counter = () => {
    const [values, setValues] = useState<ValuesProps>(() => getValuesFromLocalStorage())
    const [count, setCount] = useState<number | null>(getCountFromLocalStorage());
    
    const isIncorrectValues = useMemo(() => {
        return (
            values.minValue < MIN_LIMIT_VALUE ||
            values.maxValue > MAX_LIMIT_VALUE || 
            values.minValue >= values.maxValue ||
            values.stepValue < MIN_STEP_VALUE ||
            values.maxValue - values.minValue < values.stepValue
        ) 
            },[values]);

    const message: MessageProps = useMemo(() => {
        if (count !== null) return null;
        return isIncorrectValues
        ? "incorrect value!" 
        : "enter values and press 'set'" ;
    }, [count, isIncorrectValues])

    const isSetDisabled = useMemo(() => {
        return message !== 'enter values and press \'set\'';
    }, [message]);

    const isIncDisabled = useMemo(() => {
        return count === null || count >= values.maxValue || count+values.stepValue > values.maxValue 
        }, [count, values.maxValue, values.stepValue] )

    const isResetDisabled = useMemo(() => {
        return !!message
    }, [message])

    const isRedCount = useMemo(() => {
        if (count === null) return false;
        return count + values.stepValue > values.maxValue;  
    }, [count, values.stepValue, values.maxValue])

    const getValuesHandler = (event: ChangeEvent<HTMLInputElement>, value: 'minValue' | 'maxValue' | 'stepValue') => {
        setCount(null)
        setCountToLocalStorage(null)
        const newValue = Number(event.target.value)
        const newValues = {...values, [value]: newValue}
        setValues(newValues)
        setValuesToLocalStorage(newValues.minValue, newValues.maxValue, newValues.stepValue)
    }    

    const setCountHandler = () => {
        if (!isIncorrectValues) {
            setCount(values.minValue)
            setCountToLocalStorage(values.minValue)
        } 
    }

    const incrementHahdler = () => {
        if (typeof(count) === 'number') {
            const newCount = count + values.stepValue
            setCount(newCount) 
            setCountToLocalStorage(newCount)
        }
    }

    const resetHandler = () => {
        setCount(values.minValue)
        setCountToLocalStorage(values.minValue)
    }

    const setSettingsHandler = () => {
        setCount(null)       
    }

    // const startValueInputClassNameCondition = 
    //     values.minValue !== undefined 
    //     && (values.minValue < MIN_LIMIT_VALUE 
    //     || values.minValue >= values.maxValue!)
    //     || message === "incorrect value!"

    // const maxValueInputClassNameCondition = 
    //     values.maxValue !== undefined 
    //     && (values.maxValue > MAX_LIMIT_VALUE 
    //     || values.maxValue <= values.minValue!)
        
    // const stepValueInputClassNameCondition = 
    // (values.minValue !== undefined 
    //     && (values.minValue < MIN_LIMIT_VALUE 
    //     || values.minValue >= values.maxValue!)
    //     || values.stepValue < MIN_STEP_VALUE
    //     || values.stepValue > values.maxValue - values.minValue)
        
    

    return (
        <div className="Counter">

            <div className="container">

                <div className="block" style={{gap: '15px', padding: '18px'}}>

                    <div style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between'}}>
                        <Input
                            labelClassName="label"
                            labelName="max value:"
                            value={values.maxValue}
                            inputClassNameCondition={message === "incorrect value!"}
                            onChange={(event) =>  getValuesHandler(event, 'maxValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    </div>
                    <div style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between'}}>
                        <Input
                            labelClassName="label"
                            labelName="start value:"
                            value={values.minValue}
                            inputClassNameCondition={message === "incorrect value!"}
                            onChange={(event) =>  getValuesHandler(event, 'minValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    </div>    
                    <div style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between'}}>
                        <Input
                            labelClassName="label"
                            labelName="step:"
                            value={values.stepValue}
                            inputClassNameCondition={message === "incorrect value!"}
                            onChange={(event) =>  getValuesHandler(event, 'stepValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    </div>    
                    
                </div>

                <div className='buttonFrame' >
                    <Button 
                        buttonClassName="btn"
                        buttonName="set"
                        isButtonDisabled={isSetDisabled}
                        onClick={setCountHandler}
                    />
                </div>

            </div>
        

            <div className="container">

                <div className="block">
                    <h2 className={isRedCount ? 'bigredcount' : 'count'}>
                        {count}
                    </h2>
                    <h2 className={message === "incorrect value!" ? 'redtext' : 'text'}>
                        {message}
                    </h2>
                </div>

                <div className='buttonFrame' >
                    <div style={{display: 'flex', gap: '20px'}}>
                        <Button
                            buttonName="inc"
                            buttonClassName="btn"
                            isButtonDisabled={isIncDisabled}
                            onClick={incrementHahdler}
                        />
                        <Button
                            buttonName="reset"
                            buttonClassName="btn"
                            isButtonDisabled={isResetDisabled}
                            onClick={resetHandler}
                        />
                    </div>
                    
                </div>

            </div>

        </div>
    
    );
};
