import Link from "next/link";
import "./Hero.css";
import { TbSquareRoundedArrowDownFilled } from "react-icons/tb"; 
import Header from "../header/Header";
import { FaWhatsapp } from 'react-icons/fa'
import IgLogo from '../../../../public/assets/img/ig.webp'
import Image from 'next/image'

export default function Hero() {
    return (
        <div className="hero-container h-[580px]">
            <Header />
            <div className="main_home mt-2 flex flex-col items-center justify-center gap-8">
        <div className="overlay">
            <h1 className="hero-title text-tertiary">Deicide</h1>
            <p className="fsho_description font-bold text-sm text-gray-400">
        Bem-vindo à Deicide, uma gravadora e estúdio de produção musical que se destaca na criação e inovação sonora. 
        Nossa missão é transformar ideias em experiências auditivas, oferecendo serviços de produção, beatmaking, design sonoro e sonorização para jogos. 
        Com um portfólio diversificado e dedicação, somos comprometidos em atender as demandas de artistas e desenvolvedores, 
        promovendo a evolução da expressão artística. 
        <br />
        <span className=" text-gray-600 flex items-center justify-center gap-2 font-bold text-sm px-2">(Para consultar serviços, kits de som ou obter versões
             em formato WAV, entre em contato conosco.) <Link href={"https://wa.me/12996246050"} target="_blank"><FaWhatsapp color="green" size={20}/></Link>
              <Link href={"https://www.instagram.com/deicid3_/"} target="_blank" className="w-[74px] flex items-center"><Image className="w-full" src={IgLogo} alt="instagram logo"/></Link> </span>
         </p>
        </div>
         <h1 className="hero-second-h1 self-center text-gray-300 bg-black bg-opacity-70 px-2 rounded-xl">PLAYLIST</h1>
     <Link href="/#playlist"><button><TbSquareRoundedArrowDownFilled className="animated-arrow text-gray-300 text-[40px]"/></button></Link>   
 </div>
        </div>
    );
}