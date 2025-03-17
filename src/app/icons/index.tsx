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


export const Play = ({ size = 24 }) => <FaPlayCircle size={size} />;
export const Pause = ({ size = 24 }) => <FaPauseCircle size={size} />;
export const SkipForward = ({ size = 24 }) => <IoPlaySkipForward size={size} />;
export const SkipBack = ({ size = 24 }) => <IoIosSkipBackward size={size} />;
export const RandomMusicsFalse = ({ size = 24 }) => <PiShuffleAngularDuotone size={size} />;
export const RandomMusicsTrue = ({ size = 24 }) => <FaShuffle size={size} />;
export const VolumeOff = ({ size = 24 }) => <FaVolumeMute size={size} />;
export const VolumeOn = ({ size = 24 }) => <FaVolumeHigh size={size} />;
export const Home = ({ size = 24 }) => <FaHome size={size} />;
export const Menu = ({ size = 24 }) => <IoMenu size={size} />;