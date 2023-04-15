import React, { FC, memo } from 'react';
import { EditorTabProps } from '../types';



const Tab: FC<EditorTabProps> = ({ tabName, tabIcon, handleClick}) => {

    return (
        <div
            key={tabName}
            className={`tab-btn rounded-4`}
            onClick={() =>handleClick(tabName)}
        >
            <img src={tabIcon} alt={tabName} className={'w-11/12 h-11/12 object-contain'}/>

        </div>
    );
};

export default memo(Tab);
