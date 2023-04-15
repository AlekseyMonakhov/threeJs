import React, { FC, PropsWithChildren, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { useSnapshot } from 'valtio';
import state from '../store';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';


const CameraRig: FC<PropsWithChildren> = ({ children }) => {
    const group = useRef<Group>(null);
    const snap = useSnapshot(state);

    useFrame((state, delta) => {
        const isBreakPoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        let targetPosition = new Vector3(-0.4, 0, 2);
        if (snap.intro) {
            if (isBreakPoint) {
                targetPosition = new Vector3(0, 0, 2);
            }
            if (isMobile) {
                targetPosition = new Vector3(0, 0.2, 2.5);
            }
        } else {
            if (isMobile) {
                targetPosition = new Vector3(0, 0, 2.5);
            } else {
                targetPosition = new Vector3(0, 0, 2);
            }
        }

        easing.damp3(state.camera.position, targetPosition, 0.25, delta)

        if (group.current) {
            easing.dampE(
                group.current.rotation,
                [state.pointer.y / 10, -state.pointer.x / 5, 0],
                0.25,
                delta,
            );
        }
    });


    return (
        <group ref={group}>
            {children}
        </group>
    );
};

export default CameraRig;
