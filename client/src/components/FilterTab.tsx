import React, { FC, memo } from 'react';
import { FilterTabProps } from '../types';
import { useSnapshot } from 'valtio';
import state from '../store';


const FilterTab: FC<FilterTabProps> = ({ tabName, tabIcon, handleClick, isActiveTab }) => {

    const snap = useSnapshot(state);
    const activeStyles = isActiveTab
        ? {
            backgroundColor: snap.color, opacity: 0.5,
        } :
        {
            backgroundColor: 'transparent', opacity: 1,
        };

    return (
        <div
            key={tabName}
            className={`tab-btn rounded-full glassmorphism`}
            onClick={() => handleClick(tabName)}
            style={activeStyles}
        >
            <img src={tabIcon} alt={tabName} className={`w-2/3 h-2/3`}/>

        </div>
    );
};

export default FilterTab;
