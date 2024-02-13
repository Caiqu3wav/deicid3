import * as C from './styles';

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
        <div className='flex flex-col' onClick={() => setId(beatId)}>
                            <img className="w-[200px] h-[200px]" src={album_img} />
                            <h1>{name}</h1>
                            <audio src={audio} />
                        </div> 
                    </div>
    )

}