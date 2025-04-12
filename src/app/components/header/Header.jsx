'use client'
import DeicideLogo from "../../../../public/assets/img/deicide-logo.png"
import Image from "next/image";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleRouterLogo = () => {
        router.push('/')
    }

    return(
        <header className="w-full flex bg-primary h-[100px] items-center justify-between">
            <Image onClick={handleRouterLogo} className="w-[90px]
             ml-6" src={DeicideLogo} alt="deicide logo"/>
            <Navbar/>
            <div className="">
            </div>
        </header>
    )
}