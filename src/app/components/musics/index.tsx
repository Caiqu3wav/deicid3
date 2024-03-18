import "./styles.css";
import Link from "next/link";

type Props = {
    album_img: string; 
    name: string;
    audio: string;
    beatId: string;
    id: string;
    setId: (e: string) => void;
}

export const BeatsCard = ({ album_img, name, audio, beatId, id, setId }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center">
        <div className='beat-card flex flex-col w-[250px] h-[250px] items-center justify-center
        rounded-xl cursor-pointer midtwo2:w-[200px] midtwo2:h-[230px] midfour1:w-[168px] midfour1:h-[189px]
        lowtwo1:w-[230px] lowtwo1:h-[280px]' onClick={() => setId(beatId)}>
                            <img className="beats-img rounded-lg w-[200px] h-[200px] midtwo2:w-[160px] midtwo2:h-[160px]
                            midfour1:w-[130px] midfour1:h-[130px] lowtwo:h-[130px] lowtwo1:w-[200px] lowtwo1:h-[200px]
                            " src={album_img} />
                            <h1 className='text-2xl self-center text-slate-500'>{name}</h1>
                            <audio src={audio} />
                        </div> 
                        <Link href="/buybeat"><button className="self-center text-white bg-blue-500 w-fit px-2 mt-4 h-fit py-2 
                        rounded-2xl transition-all duration-700 hover:bg-black hover:text-blue-600">$BUY/INFO</button></Link>
                    </div>
    )

}