import { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanProps = {
    value: number;
    onChange: (newValue: number) => void;
    };

    export const EditableSpan = ({ value, onChange }: EditableSpanProps) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState(value.toString());

    const activateEditMode = () => setIsEditable(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        const numValue = Number(inputValue);
        if (!isNaN(numValue)) {
        onChange(numValue);
        }
        setIsEditable(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const numValue = Number(inputValue); 
        if (e.key === 'Enter') {
            onChange(numValue);
            }
            setIsEditable(false);
        }
    

    return isEditable ? (
        <input
            type="number"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{value}</span>
    );
};
