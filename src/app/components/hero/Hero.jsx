import Link from "next/link";
import "./Hero.css";
import { TbSquareRoundedArrowDownFilled } from "react-icons/tb";

export default function Hero() {
    return(
        <div className="hero-container h-[550px]">
            <div className="main_home flex flex-col items-center justify-center gap-8">
        <div className="overlay">
            <h1 className="hero-title">Deicid3</h1>
         <p className="fsho_description font-bold">Artista/produtor brasileiro focado em música trap, <br/>
              buscando inovar sem limitações cada <br/>
               vez mais trazendo produções <br/>
                de diversos estilos/vibes <br/>
                 contribuindo para a <br/>
                  evolução e modernidade da expressão <br/>
                 artística e músical.
         </p>
        </div>
         <h1 className="hero-second-h1 self-center text-white">CATALOGO E PLAYLIST</h1>
     <Link href="/#playlist"><button><TbSquareRoundedArrowDownFilled className="animated-arrow text-[40px]"/></button></Link>   
 </div>
        </div>
    );
}