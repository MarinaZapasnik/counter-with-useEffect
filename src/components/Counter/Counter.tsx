import { ChangeEvent, useState } from "react";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { getCountFromLocalStorage, getValuesFromLocalStorage, setCountToLocalStorage, setValuesToLocalStorage } from "../../utils/localStorageService";

export type ValuesProps = {
    minValue: number 
    maxValue: number
    stepValue: number 
}

export const Counter = () => {


    const  MIN_LIMIT_VALUE:number = 0 
    const  MAX_LIMIT_VALUE:number = 500 
    const  MIN_STEP_VALUE:number = 1 

    const initialMessage = (minValue: number, maxValue: number, count: number | null, step: number) => {
        if (count !== null) {
            return null
        }  else

        if (minValue >= MIN_LIMIT_VALUE 
            && maxValue <= MAX_LIMIT_VALUE 
            && minValue < maxValue
            && step >= MIN_STEP_VALUE
            && (maxValue - minValue) >= step
            ) {
                return "enter values and press 'set'"
            } else { 
                return "incorrect value!"
            }

    }


    type MessageProps = "enter values and press 'set'" | "incorrect value!" | null

    

    const [values, setValues] = useState<ValuesProps>(() => getValuesFromLocalStorage())
    const [count, setCount] = useState<number | null>(getCountFromLocalStorage());
    const [message, setMessage] = useState<MessageProps>(initialMessage(values.minValue, values.maxValue, count, values.stepValue));
    const [isSetDisabled, setSetDisabled] = useState<boolean>(message !== 'enter values and press \'set\'' )
    const [isIncDisabled, setIncDisabled] = useState<boolean>(count === null || count >= values.maxValue)
    const [isResetDisabled, setResetDisabled] = useState<boolean>(!!message)

    const isIncorrectValues = (minValue: number, maxValue: number, stepValue: number): boolean => {
            return minValue < MIN_LIMIT_VALUE ||
                maxValue > MAX_LIMIT_VALUE || 
                minValue >= maxValue ||
                stepValue < MIN_STEP_VALUE ||
                maxValue - minValue < stepValue
        };

    const isRedCount = ( maxValue: number, stepValue: number, count: number | null): boolean => {
        
        // return stepValue === 1  ?
        //             count === maxValue :
        //             count !== null && count > Math.floor((maxValue - minValue) / stepValue) * stepValue
        if (count === null) return false;

        return count + stepValue > maxValue;
    }



    const getValuesHandler = (event: ChangeEvent<HTMLInputElement>, value: 'minValue' | 'maxValue' | 'stepValue') => {
        setMessage("enter values and press 'set'" )
        setCount(null)
        setCountToLocalStorage(null)
        const newValue = Number(event.target.value)
        const newValues = {...values, [value]: newValue}
        setValues(newValues)

        const isIncorrect = isIncorrectValues(newValues.minValue, newValues.maxValue, newValues.stepValue);

            setMessage(isIncorrect ? 'incorrect value!' : count !== null ? null : "enter values and press 'set'" )
            setSetDisabled(isIncorrect ? true : false)
            
                
        setValuesToLocalStorage(newValues.minValue, newValues.maxValue, newValues.stepValue)
    }    

    const setCountHandler = () => {

        if (values.minValue >= MIN_LIMIT_VALUE && values.maxValue <= MAX_LIMIT_VALUE && values.minValue <= values.maxValue) {
            setMessage(null)
            setCount(values.minValue)
            setSetDisabled(true)
            setIncDisabled(false)
            setResetDisabled(false)
            setCountToLocalStorage(values.minValue)
        } 
    }

    const incrementHahdler = () => {
        
        if (typeof(count) === 'number') {
            const newCount = count + values.stepValue
            setCount(newCount)            

            const isFinish = isRedCount(values.maxValue, values.stepValue, newCount)
            isFinish && setIncDisabled(true)

            setCountToLocalStorage(newCount)
        }
    }


    const resetHandler = () => {
        setIncDisabled(false)
        setCount(values.minValue)
        setCountToLocalStorage(values.minValue)
    }

    const setSettingsHandler = () => {
        
        
        setIncDisabled(true)
        setResetDisabled(true)
        setCount(null)
        const isIncorrect = isIncorrectValues(values.minValue, values.maxValue, values.stepValue);
        setMessage(isIncorrect ? 'incorrect value!' : "enter values and press 'set'" )
        setSetDisabled(isIncorrect ? true : false)
        
    }

    const startValueInputClassNameCondition = 
        values.minValue !== undefined 
        && (values.minValue < MIN_LIMIT_VALUE 
        || values.minValue >= values.maxValue!)
        || message === "incorrect value!"

    const maxValueInputClassNameCondition = 
        values.maxValue !== undefined 
        && (values.maxValue > MAX_LIMIT_VALUE 
        || values.maxValue <= values.minValue!)
        
    const stepValueInputClassNameCondition = 
    (values.minValue !== undefined 
        && (values.minValue < MIN_LIMIT_VALUE 
        || values.minValue >= values.maxValue!)
        || values.stepValue < MIN_STEP_VALUE)
        
    

    return (
        <div className="Counter">

            <div className="container">

                <div className="block" style={{gap: '15px', padding: '18px'}}>

                    <div style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between'}}>
                        <Input
                            labelClassName="label"
                            labelName="max value:"
                            value={values.maxValue}
                            inputClassNameCondition={maxValueInputClassNameCondition}
                            onChange={(event) =>  getValuesHandler(event, 'maxValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    </div>
                    <div style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between'}}>
                        <Input
                            labelClassName="label"
                            labelName="start value:"
                            value={values.minValue}
                            inputClassNameCondition={startValueInputClassNameCondition}
                            onChange={(event) =>  getValuesHandler(event, 'minValue')}
                            onClick={setSettingsHandler}
                            
                        />
                    </div>    
                    <div style={{display: 'flex', gap: '20px', width: '100%', justifyContent: 'space-between'}}>
                        <Input
                            labelClassName="label"
                            labelName="step:"
                            value={values.stepValue}
                            inputClassNameCondition={stepValueInputClassNameCondition}
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
                    <h2 className={isRedCount(values.maxValue, values.stepValue, count) ? 'bigredcount' : 'count'}>
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
