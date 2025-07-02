import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

export const Input = () => {
    return (
        <>
        <label className="label">start value:</label>
                        <input 
                            value={values.minValue}
                            className={
                                (values.minValue !== undefined 
                                    && (values.minValue < MIN_LIMIT_VALUE 
                                        || values.minValue >= values.maxValue!))
                                        ? 'inputerror' : 'input'}  
                            type="number"
                            step={1}                          
                            onChange={(event: ChangeEvent<HTMLInputElement>) => getValuesHandler(event, 'minValue')}
                            onClick={setSettingsHandler}    
                        />  
        </>
    )
}