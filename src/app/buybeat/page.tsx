import Header from "../components/header/Header";
import "./style.css"
import Image from "next/image";
import deicid3Logo from "../../../public/assets/img/deicide-logo.png";
import beatSingle from "../../../public/assets/img/beatsingle.png";
import combo3Beats from "../../../public/assets/img/combo3beats.png";
import BeatExclusive from "../../../public/assets/img/beatsexclusive.png";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";

export default function BuyBeat() {
    return (
        <main>
            <Header />
            <div className="bb-container flex items-center justify-center py-6">
                <div className="overlay-buy w-[60%] majortwo1-2:w-[70%] flex flex-col items-center justify-center
                 midfour1:w-[80%]">
                    <Image src={deicid3Logo} className="w-[50px] h-[64px]" alt="deicide logo" />
                    <h1 className="about-title text-[32px] low:text-[26px]">Informações/Compra</h1>
                    <div className="w-[85%] texts-cont majortwo1-2:w-[85%]">
                        <h1>Olá, amantes da música!</h1>
                        <p>Sou um artista brasileiro, apaixonado por beats únicos e qualidade sonora excepcional. Aqui está o que você precisa saber:</p>
                        <h1>Sobre Mim:</h1>
                        <p>Na minha jornada, jamais faço algo que não seja alimentado pela minha paixão. Batida, melodia e ritmo são cuidadosamente elaborados, tentando manter a autenticidade e originalidade como princípios fundamentais. A produção musical é mais do que um negócio para mim; é uma jornada criativa que nunca terá um ponto final.</p>
                        <h1>Beats à Venda:</h1>
                        <h2>Descubra o som que vai transformar seus projetos. Ofereço opções de pacotes:</h2>
                        <div className="flex flex-col">
                            <p className="font-bold text-white text-lg">Beat mp3 Lease:</p>
                            <Link href="https://buy.stripe.com/3cs3fifDg6eyaHe3cf" target="_blank">
                                <Image src={beatSingle} alt="beat image" className="rounded-xl" />
                            </Link>
                            <div className="flex gap-2">
                                <p className="text-lg majorthree1:hidden">Link de pagamento:</p> 
                                <a href="https://buy.stripe.com/3cs3fifDg6eyaHe3cf" className="paylink midtwo4:hidden midtw:text-sm midtwo3:text-xs" target="_blank">
                                https://buy.stripe.com/3cs3fifDg6eyaHe3cf
                                </a>
                                <a className="text-lg font-bold text-blue-400 hidden midtwo4:block" 
                                href="https://buy.stripe.com/3cs3fifDg6eyaHe3cf">Clique para pagar</a>
                            </div>
                        </div>
                        <div className=" flex-col">
                            <p className="font-bold text-white text-lg">Pacote 3 beats:</p>
                            <Link href="https://buy.stripe.com/3cs6rugHk0Ue8z6004" target="_blank">
                                <Image src={combo3Beats} alt="beat image" className="rounded-xl" />
                            </Link>
                            <div className="flex gap-2">
                                <p className="text-lg majorthree1:hidden">Link de pagamento:</p>
                                <a href="https://buy.stripe.com/3cs6rugHk0Ue8z6004" className="paylink midtw:text-sm midtwo3:text-xs midtwo4:hidden" target="_blank">
                                https://buy.stripe.com/3cs6rugHk0Ue8z6004
                                </a>
                                <a className="text-lg font-bold text-blue-400 hidden midtwo4:block" href="https://buy.stripe.com/00g7vy76KcCW5mUbIJ">Clique para pagar</a>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-white text-lg">Beat Exclusivo:</p>
                            <Link href="https://buy.stripe.com/7sI5nqfDg7iCg1y9AL" target="_blank">
                                <Image src={BeatExclusive} alt="beat image" className="rounded-xl" />
                            </Link>
                            <div className="flex gap-2">
                                <p className="text-lg majorthree1:hidden">Link de pagamento:</p>
                                <a href="https://buy.stripe.com/00gdTW3UyfP87v2005" className="paylink midtwo4:hidden midtw:text-sm midtwo3:text-xs" target="_blank">
                                https://buy.stripe.com/00gdTW3UyfP87v2005
                                </a>
                                <a className="text-lg font-bold text-blue-400 hidden midtwo4:block" href="https://buy.stripe.com/00gdTW3UyfP87v2005">Clique para pagar</a>
                            </div>
                        </div>
                        <h1>Como Comprar:</h1>
                        <p>Escolha o pacote que se encaixa no seu estilo.</p>
                        <p>Clique no link de pagamento.</p>
                        <p>Receba instruções depois do pagamento para entrar em contato e obter seus beats.</p>

                        <h1>Dúvidas ou Personalização?</h1>
                        <h2>Estou aqui para ajudar! Entre em contato:</h2>

                        <p className="flex gap-2">
                            <FaWhatsapp size={30} className="bg-green-600 rounded-full" />
                            <span className="text-green-600 font-bold text-lg">
                                <Link href="https://wa.me/12997364432" target="_blank">
                                    12 99736-4432
                                </Link>
                            </span>
                        </p>
                        <br />
                        <p className="flex gap-2">
                            <MdOutlineAttachEmail size={30} className="bg-blue-500 rounded-xl" />
                            <span className="text-blue-600 text-lg">
                                <Link href="mailto:prodfsho777@gmail.com" target="_blank">
                                    prodfsho777@gmail.com
                                </Link>
                            </span>
                        </p>
                        <br />
                        <p className="flex gap-2">
                            <FaTelegram size={30} className="bg-gray-400 rounded-xl" />
                            <span className="text-gray-400 text-lg">
                                <Link href="https://t.me/Dvrkss" target="_blank">
                                    Dvrkss/12 99736-4432
                                </Link>
                            </span>
                        </p>
                        <br />
                        <p className="text-lg">
                            Obrigado por escolher minha música. Juntos, vamos criar algo incrível!
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
