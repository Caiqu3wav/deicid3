import "./styles.css";

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
        <div>
        <div className='beat-card flex flex-col w-[250px] h-[250px] items-center justify-center
        rounded-xl cursor-pointer midtwo2:w-[200px] midtwo2:h-[230px] midfour1:w-[168px] midfour1:h-[189px]
        lowtwo1:w-[230px] lowtwo1:h-[280px]' onClick={() => setId(beatId)}>
                            <img className="w-[200px] h-[200px] midtwo2:w-[160px] midtwo2:h-[160px]
                            midfour1:w-[130px] midfour1:h-[130px] lowtwo1:w-[200px] lowtwo:h-[200px]
                            " src={album_img} />
                            <h1 className='text-2xl self-center text-slate-500'>{name}</h1>
                            <audio src={audio} />
                        </div> 
                    </div>
    )

}