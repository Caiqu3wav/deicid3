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
        rounded-xl cursor-pointer' onClick={() => setId(beatId)}>
                            <img className="w-[200px] h-[200px]" src={album_img} />
                            <h1 className='text-2xl self-center text-slate-500'>{name}</h1>
                            <audio src={audio} />
                        </div> 
                    </div>
    )

}