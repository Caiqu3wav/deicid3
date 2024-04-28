import DeicideLogo from "../../../../public/assets/img/deicide-logo.png"
import Image from "next/image";
import "./Header.css";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleRouterLogo = () => {
        router.push('/')
    }

    return(
        <header className="w-full flex items-center">
            <Image onClick={handleRouterLogo} className="w-[70px] h-[90px] ml-6 self-start" src={DeicideLogo}/>
            <Navbar/>
        </header>
    )
}