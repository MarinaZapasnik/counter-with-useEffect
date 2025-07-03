import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type InputType = DefaultInputPropsType & {
    value: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void,
    onEnter?: () => void,
    labelClassName: string,
    labelName: string,
    inputClassNameCondition: boolean,
    
}
export const Input: React.FC<InputType> = (
    {
        value,
        onChange,
        onClick,
        onEnter,
        labelClassName,
        labelName,
        inputClassNameCondition,
        type = "number", // Указываем значение по умолчанию
        step = 1,       // Указываем значение по умолчанию
        ...restProps
    }
) => { 

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event)
    }
    const onClickHandler = () => {
        onClick()
    }
    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnter) {
            onEnter();
        }
    }


    return (
        <>
        <label className={labelClassName}>{labelName}</label>
                        <input 
                            {...restProps}
                            value={value}
                            className={inputClassNameCondition ? 'inputerror' : 'input' }  
                            type={type}
                            step={step}                          
                            onChange={onChangeHandler}
                            onClick={onClickHandler} 
                            onKeyDown={onEnterHandler}   
                        />  
        </>
    )
}