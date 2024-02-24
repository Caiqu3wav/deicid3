"use client";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css"
import { useState, useEffect } from "react";

export default function Navbar(){
    const [isActive, setIsActive] = useState(false);

    const sideList = [
        {
          title: 'Home',
          path: '/',
        },
        {
          title: 'Playlist',
          path: '#playlist',
        },
        {
          title: 'Informações/contato',
          path: '/buybeat',
        },
      ];

    const toggleMenu = () => {
        setIsActive(!isActive);
    }

    useEffect(() => {
        const handleEscKeyPress = (e) => {
            if (e.keycode === 27 && isActive) {
                setIsActive(false);
            }
        };

        if (isActive) {
            document.body.style.setProperty("overflow", "hidden");
        }else {
            document.body.style.setProperty("overflow", "auto");
        }

        document.addEventListener("keydown", handleEscKeyPress);
        
        return () => {
            document.removeEventListener("keydown", handleEscKeyPress);
        };
    }, [isActive]);
    
    return(
        <nav className="flex items-center justify-center self-center ml-[20%] majortwomin:ml-[25%] majorthree:ml-[16%]
  majorfour1:ml-[10%] midtwo4:ml-[5%] ">

            <ul className="flex font-bold text-2xl cursor-pointer midthree:text-lg">
                <Link href="/"><li className="border-l-2 border-r-2 border-black px-3 py-8 hover:bg-slate-600">Home</li></Link>
                <Link href="#playlist"><li className="border-r-2 border-black px-3 py-8 hover:bg-slate-600">Playlist</li></Link>
                <Link href="/buybeat"><li className=" border-r-2 border-black px-3 py-8 hover:bg-slate-600">Informações/Contato</li></Link>
            </ul>
            <button aria-label="Open Menu" onClick={toggleMenu} className="hidden self-end ml-[47%]">
                <GiHamburgerMenu size={60} className="" style={{ color: 'black' }} />
</button>

                {isActive && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsActive(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex="0"
          ></div>
        </div>
      )}

      <aside
        className={`transform top-0 left-0 w-64 lowtwo2:w-44 lowthreetwo:w-36 text-white font-extrabold fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
         
         {sideList.map(({ title, path }, index) => (
    <Link href={path} key={index}>
        <span className="flex items-center p-4 hover:bg-blue-600 hover:text-orange-400">
          <span className="border-b-4">{title}</span>
        </span>
    </Link>
  ))}
      </aside>
        </nav>
    );
}