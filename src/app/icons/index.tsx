import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosSkipBackward } from "react-icons/io";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaShuffle } from "react-icons/fa6";
import { PiShuffleAngularDuotone } from "react-icons/pi";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";


export const Play = () => {
    return (
        <FaPlayCircle/>
    )
}
export const Pause = () => {
    return (
        <FaPauseCircle/>
    )
}
export const SkipForward = () => {
    return (
        <IoPlaySkipForward/>
    )
}
export const SkipBack = () => {
    return (
        <IoIosSkipBackward/>

    )
}
export const RandomMusicsFalse = () => {
    return (
        <PiShuffleAngularDuotone/>
    )
}
export const RandomMusicsTrue = () => {
    return (
        <FaShuffle/>
    )
}
export const VolumeOff = () => {
    return (
        <FaVolumeMute/>

    )
}
export const VolumeOn = () => {
    return (
        <FaVolumeHigh/>

    )
}
export const Home = () => {
    return (
        <FaHome/>

    )
}



export const Menu = () => {
    return (
        <IoMenu/>

    )
}