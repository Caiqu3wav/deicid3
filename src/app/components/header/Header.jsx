import DeicideLogo from "../../../../public/assets/img/deicide-logo.png"
import Image from "next/image";
import "./Header.css";
import Navbar from "../navbar/Navbar";

export default function Header() {
    return(
        <header className="w-full flex items-center">
            <Image className="w-[70px] h-[90px] ml-6 self-start" src={DeicideLogo}/>
            <Navbar/>
        </header>
    )
}