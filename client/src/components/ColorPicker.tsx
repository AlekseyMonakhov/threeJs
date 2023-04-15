import React, { memo } from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';
import { HexColorString } from 'three';

const ColorPicker = () => {
    const snap = useSnapshot(state);

    return (
        <div className={'absolute left-full ml-3'}>
            <SketchPicker
                color={snap.color}
                disableAlpha
                onChange={(color) => state.color = color.hex as HexColorString}
            />
        </div>
    );
};

export default memo(ColorPicker);
