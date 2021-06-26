import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss';
import { useTheme } from "../hooks/useTheme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};


export function Button({ isOutlined = false, ...props }: ButtonProps) {
    const { theme } = useTheme();
    return (
        <button
            className={`button ${isOutlined ? "outlined" : ""} ${theme === "dark" ? "dark" : ""}`}
            {...props} />
    )
}
