'use client';
import "../../styles/Modal.css"
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse, 
  VolumeOff, VolumeOn } from '../../icons/index';
import { useEffect, useState } from "react";
import { ModalProps } from "@/interfaces";
import usePlayerStore from "@/app/store/playerStore";

const Modal: React.FC<ModalProps> = ({
  closeModal,
  isOpen,
  audioRef
}) => {
  const {
    currentTrack,
        isPlaying,
        isMuted,
        isRandom,
        volume,
        toggleMute,
        togglePlay,
        toggleRandom,
        playPrevTrack,
        setVolume,
        progress,
        setProgress,
        duration,
        playNextTrack
    } = usePlayerStore((state) => ({
        currentTrack: state.currentTrack,
        isPlaying: state.isPlaying,
        isMuted: state.isMuted,
        isRandom: state.isRandom,
        volume: state.volume,
        toggleMute: state.toggleMute,
        togglePlay: state.togglePlay,
        toggleRandom: state.toggleRandom,
        playPrevTrack: state.playPrevTrack,
        setVolume: state.setVolume,
        progress: state.progress,
        duration: state.duration,
        setProgress: state.setProgress,
        playNextTrack: state.playNextTrack
    }));

  if (!isOpen) {
    return null;
  }
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(isOpen);


  if(!currentTrack) {
    return null;
  }

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  
  const calculeDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60)
    const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(sec % 60)
    const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${newMinutes}:${newSeconds}`
}

    return (
<div className={`modal-overlay ${modalIsOpen ? 'modal-open' : ''}`} onClick={closeModal}>
      <div className={`modal-content ${modalIsOpen ? 'modal-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <Image className="rounded-xl w-[200px] h-[200px]" width={200} height={200} src={currentTrack?.album_img ?? ''}
         alt={currentTrack?.name ?? ''} />
        <h1 className="text-xl font-semibold">{currentTrack.name}</h1>
        <div className='buttons flex flex-nowrap text-4xl text-orange-400 space-x-3 majorfour:text-[28px]
                    lowtwo2-1:text-[24px]'>
                        <button onClick={toggleRandom} className='randomMusicsButton'>
            {isRandom ? <RandomMusicsTrue /> : <RandomMusicsFalse />}
          </button>
          <button onClick={playPrevTrack}>
            <SkipBack />
          </button>
          <button className='playPause' onClick={togglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={playNextTrack}>
            <SkipForward />
          </button>
        </div>
        <div className='progressBar flex gap-2 majorfour:ml-4'>
                            <p className='PcurrentTime'>
                            {(progress !== null) && calculeDuration(progress)}
                            </p>
                            <input 
                                type="range" 
                                className='currentProgress'
                                value={progress} 
                                max={duration}
                                onChange={(e) => {
                                    const newProgress = parseFloat(e.target.value);
                                    if (audioRef.current) {
                                        audioRef.current.currentTime = newProgress;
                                        setProgress(newProgress);
                                      } 
                                }}
                            />
                            
                            <p className='Pduration'>
                                {(duration && !isNaN(duration)) && 
                                calculeDuration(duration)}
                            </p>
                        </div> 

        <div className='test mr-5 flex gap-1 items-center majorfour:mr-2'>
                <button 
                    className='volumeButton' 
                    onClick={toggleMute}>
                    {isMuted ? <VolumeOff/> : <VolumeOn />}
                </button>
                <input
                className="rounded-md"
                    type="range" 
                    step="0.01"
                    onChange={(e) => setVolume(parseFloat(e.target.value))} 
                    value={volume}
                    max='1'
                    min='0'
                />
                </div>
        <button className="text-2xl text-blue-600 font-extrabold bg-slate-300 py-3 px-5 rounded-3xl" onClick={closeModal}>X</button>
      </div>
    </div>
    );
  }

  export default Modal;