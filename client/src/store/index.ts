import {proxy} from 'valtio';
import { ColorRepresentation, HexColorString } from 'three';

interface State {
    intro: boolean,
    color: HexColorString,
    isLogoTexture: boolean,
    isFullTexture: boolean,
    logoDecal: string,
    fullDecal: string
}

const state = proxy<State>({
    intro: true,
    color: "#EFBD48",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
})

export default state;