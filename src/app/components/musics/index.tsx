import { Beat } from "@/interfaces";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import usePlayerStore from "@/app/store/playerStore";
import { Pause, Play } from "@/app/icons";
import { MdPlaylistAddCircle } from "react-icons/md";
import { CgPlayListRemove } from "react-icons/cg";
import { beats } from "@/app/api/beats";

type Props = {
    beat: Beat
}

export const BeatsCard = ({ beat }: Props) => {
    const {
        playTrack,
        togglePlay,
        currentTrack,
        isPlaying,
        togglePlaylist, 
        playlist,
        addTracks,
        addTracksAndRemove
    } = usePlayerStore((state) => ({
        playTrack: state.playTrack,
        togglePlay: state.togglePlay,
        currentTrack: state.currentTrack,
        isPlaying: state.isPlaying,
        playlist: state.playlist,
        togglePlaylist: state.togglePlaylist,
        addTracks: state.addTracks,
        addTracksAndRemove: state.addTracksAndRemove
    }));

    const isCurrentTrackPlaying = currentTrack?.id === beat.id && isPlaying;
    const isTrackInPlaylist = playlist.some((t) => t.id === beat.id);

    const handlePlayTrack = (beat: Beat) => {
        playTrack(beat);
        addTracksAndRemove(beats);
    }

    return (
        <div className="flex flex-col items-center justify-center">
        <div className='bg-black bg-opacity-40 transition-all duration-700
         hover:bg-slate-300 hover:bg-opacity-95 flex flex-col w-[240px] h-[240px] items-center justify-center
        rounded-xl midtwo2:w-[200px] midtwo2:h-[225px] midfour1:w-[168px] midfour1:h-[189px]
        lowtwo1:w-[230px] lowtwo1:h-[270px]'>
                            <img className="beats-img rounded-lg w-[170px] h-[170px] midtwo2:w-[140px] midtwo2:h-[140px]
                            midfour1:w-[120px] midfour1:h-[120px] lowtwo:h-[120px] lowtwo1:w-[180px] lowtwo1:h-[180px]"
                            src={beat.album_img} alt={beat.name} />
                            <h1 className='text-2xl self-center text-orange-500'>{beat.name}</h1>
                            <audio src={beat.audio} />
                            <div className="flex gap-2">
                            <button
                            className='playPause cursor-pointer text-slate-800 hover:text-orange-500 text-2xl'
                            onClick={() => isCurrentTrackPlaying ? togglePlay() : handlePlayTrack(beat)}
                              >
                                {isCurrentTrackPlaying ? <Pause /> : <Play />}
                        </button>
                        <button
                            className='playPause cursor-pointer text-slate-800 hover:text-orange-500 text-2xl' 
                            onClick={() => togglePlaylist(beat)}
                              >
                                {isTrackInPlaylist ? <CgPlayListRemove  /> : <MdPlaylistAddCircle />}
                        </button>
                        </div>
                        </div> 
                        <Link href="/buybeat"><button className="self-center text-white bg-blue-500 w-fit px-2 mt-4 h-fit py-2 
                        rounded-2xl transition-all duration-700 hover:bg-black hover:text-blue-600">$BUY/INFO</button></Link>
                    </div>
    )

}