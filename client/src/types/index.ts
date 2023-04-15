import { GLTF } from 'three-stdlib';

interface TabProps  {
    tabIcon: string
}

export interface EditorTabProps extends TabProps {
    tabName:EditorTabsType,
    handleClick(current : EditorTabsType):void
}

export interface FilterTabProps extends TabProps{
    tabName:FilterTabNames,
    isActiveTab: boolean,
    handleClick(current : FilterTabNames):void
}

export type DreiGLTF = GLTF & {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.MeshStandardMaterial>;
};

export type EditorTabsType = "colorpicker" | "filepicker" | "aipicker" | "";
export type FilterTabNames ="logoShirt" | "stylishShirt";