import React, { FC, memo } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { getContrastingColor } from '../config/helpers';


interface CustomButtonProps {
    type: "outline" | "filled",
    title: string,
    customStyles: string,
    disabled?:boolean,
    handleClick?(): void,
}

const CustomButton: FC<CustomButtonProps> = ({ customStyles, type, title, handleClick, disabled }) => {
    const snap = useSnapshot(state);

    const generateStyle = (type:string) => {
        if(type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if(type ==='outline') {
            return  {
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color
            }
        }
    }

    return (
        <button
            className={`px-2 py-1.5 flex-1 rounded-md ${customStyles} ${disabled && 'cursor-not-allowed'}`}
            style={generateStyle(type)}
            onClick={handleClick}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

export default memo(CustomButton);
