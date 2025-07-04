
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type ButtonType = DefaultButtonPropsType & {
    buttonName: string
    buttonClassName: string
    isButtonDisabled: boolean
    onClick: () => void,
}


export const Button: React.FC<ButtonType> = (
    {
        buttonName,
        buttonClassName,
        isButtonDisabled,
        onClick,
        ...restProps
    }
) => {

    const onClickHandler = () => {
        onClick()
    }

    return (
        <button
        {...restProps}
        className={buttonClassName}
        disabled={isButtonDisabled}
        onClick={onClickHandler}>
            {buttonName}
            
        </button>
    )
}