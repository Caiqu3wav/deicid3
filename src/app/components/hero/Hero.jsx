import Link from "next/link";
import "./Hero.css";
import { TbSquareRoundedArrowDownFilled } from "react-icons/tb"; 
import Header from "../header/Header";

export default function Hero() {
    return (
        <div className="hero-container h-[580px]">
            <Header />
            <div className="main_home mt-2 flex flex-col items-center justify-center gap-8">
        <div className="overlay">
            <h1 className="hero-title text-blue-950">FSHO</h1>
         <p className="fsho_description font-bold">Artista/produtor brasileiro <br/>
              buscando inovar sem limitações cada <br/>
               vez mais trazendo produções <br/>
                de diversos estilos/vibes <br/>
                 contribuindo para a <br/>
                  evolução e modernidade da expressão <br/>
                 artística e músical. <br />
                 <span className="text-blue-700 font-bold px-2">(Para obter versão wav ou download entre em contato)</span>
         </p>
        </div>
         <h1 className="hero-second-h1 self-center text-white bg-black bg-opacity-70 px-2 rounded-xl">CATALOGO E PLAYLIST</h1>
     <Link href="/#playlist"><button><TbSquareRoundedArrowDownFilled className="animated-arrow text-[40px]"/></button></Link>   
 </div>
        </div>
    );
}