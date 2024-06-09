import usePlayerStore from "../store/playerStore";
import { Pause, Play } from "../icons";
import { CgPlayListRemove } from "react-icons/cg";
import "../styles/Modal.css"

interface PlaylistProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function Playlist({ isVisible, onClose }: PlaylistProps) {
  const { playlist, playTrack, togglePlaylist, togglePlay, currentTrack, isPlaying } = usePlayerStore(state => ({
      playlist: state.playlist,
      playTrack: state.playTrack,
      togglePlaylist: state.togglePlaylist,
      togglePlay: state.togglePlay,
      currentTrack: state.currentTrack,
      isPlaying: state.isPlaying 
  }));

  if (!isVisible) return null;

  const isCurrentTrackPlaying = (track: any) => { 
    return currentTrack?.id === track.id && isPlaying
  }


return (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-gradient-to-br from-slate-800 to-orange-400 bg-opacity-75 rounded-lg p-4 w-1/2 h-3/4 midfour:w-[65%] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-xl midfour:text-sm">
        <h2 className="font-bold">Playlist</h2>
        <p className="font-bold text-black">{playlist.length} Músicas</p>
        </div>
        <button onClick={onClose} className="text-xl font-bold px-2  bg-black text-white rounded-full">X</button>
      </div>
      <hr className="border-2 border-blue-500 w-full" />
      <ul className="flex flex-col gap-1 mt-2">
        {playlist.map(track => (
          <li key={track.id} className="song-playlist-li cursor-pointer">
            <div className="mb-2 rounded-lg w-[350px] majorthree:w-[200px] bg-slate-600 flex gap-1 items-center">
            <img src={track.album_img} className="w-[50px] h-[50px] rounded-lg" alt="" />
            <p className="flex flex-col items-center text-white"><span className=" border-b-2 
            border-b-blue-400 rounded-lg majorthree:ml-2 midfour:text-sm px-1">{track.name}</span>
            </p>
            </div>
            <div className="flex gap-4">
            <button
                          className='playPause cursor-pointer text-2xl'
                          onClick={() => isCurrentTrackPlaying(track) ? togglePlay() : playTrack(track)}
                            >
                              {isCurrentTrackPlaying(track) ? <Pause /> : <Play />}
                      </button>
            <button
                          className='playPause cursor-pointer text-2xl' 
                          onClick={() => togglePlaylist(track)}
                            >
                              <CgPlayListRemove />
                      </button>
                      </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
}
