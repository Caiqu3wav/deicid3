import DeicideLogo from "../../../../public/assets/img/deicide-logo.png"
import Image from "next/image";
import "./Header.css";
import Navbar from "../navbar/Navbar";
import { GiCharacter } from "react-icons/gi";

export default function Header() {
    return(
        <header className="w-full flex justify-between items-center">
            <Image className="w-[70px] h-[90px] ml-6" src={DeicideLogo}/>
            <Navbar/>
            <button className="login-btn mr-3 flex gap-2 items-center justify-center h-[40px] pl-2 pr-2 
            rounded-xl text-2xl">
                <GiCharacter size={24} />Login</button>
        </header>
    )
}