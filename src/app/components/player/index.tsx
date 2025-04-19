'use client';
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse, VolumeOff, VolumeOn } from '../../icons/index';
import Modal from "../modal/Modal";
import React from "react";
import { PiEqualizer } from "react-icons/pi"
import ModalFx from  "../modalFx/ModalFx"
import useAudioFx from '@/app/Audio/index'
import {usePlayerState} from '../../utils/index'

const Player: React.FC = () => {
    const {
        currentTrack, isPlaying, isMuted,
        isRandom, volume, progress,
        duration, toggleMute, togglePlay, toggleRandom,
        playNextTrack, playPrevTrack, setVolume, setProgress,
        setDuration,
      } = usePlayerState();

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenFx, setIsModalOpenFx] = useState(false);
    const audioFx = useAudioFx(audioRef);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

        useEffect(() => {
            if (audioRef.current && currentTrack) {
                audioRef.current.volume = volume;
                if (isPlaying) {
                    audioRef.current.play();
                } else {
                    audioRef.current.pause();
                }
            }

            if (audioRef.current) {
                audioRef.current.volume = volume;
                audioRef.current.volume = isMuted ? 0 : volume;
              }
        }, [isPlaying, currentTrack, volume, isMuted]);

        const calculeDuration = (sec: number) => {
            const minutes = Math.floor(sec / 60)
            const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
            const seconds = Math.floor(sec % 60)
            const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

            return `${newMinutes}:${newSeconds}`
        }
        
        const handleTimeUpdate = () => {
            if (audioRef.current) {
                setProgress(audioRef.current.currentTime);
            }
        };
        
        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
            }
        };

        const handleModalFxOpen = () => {
            setIsModalOpenFx(true);
            console.log('modal fx open');
        }

        return(
            <div className="w-full flex justify-between bg-black rounded-md">
            
            <div className='musicDiv'>
                
            <div className='flex gap-3' key={currentTrack?.id}>
                                <>
                                {currentTrack && (
                                   <button className="flex flex-nowrap gap-1" onClick={openModal}>
                                    <img className="w-[50px] h-[50px] majorfour:h-[60px] majorfour:w-[60px] lowtwo2:w-[50px]" src={currentTrack.album_img} />
                                    <div>
                                        <h1 className="text-gray-300">{currentTrack.name}</h1>
                                    </div>
                                    </button>
                                          )}

                                </>
                                {isModalOpen && (
                                        <Modal
                                       closeModal={closeModal}
                                       isOpen={isModalOpen}      
                                       audioRef={audioRef}                                 
                                        />
                                        )}
                                {isModalOpenFx && (
                                        <ModalFx
                                       closeModal={() => setIsModalOpenFx(false)}
                                       isOpen={isModalOpenFx}
                                       toggleFx={audioFx.toggleFx}
                                       audioFx={audioFx}
                                        />
                                        )}
                               <audio
                                src={currentTrack?.audio} 
                                ref={audioRef}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={playNextTrack}
                                />
                            </div>    
            </div>
            <div className='flex items-center'>
                <div className='flex gap-32 mr-[290px] majortwo2:gap-20 majortwo3:gap-10 majortwo3:mr-[190px]
                 majortwo4:mr-0 majorfour:flex-col-reverse majorfour:gap-0 majorfour:items-center majorfour:text-[14px]
                 midtwo3:mr-10 midfour:mr-6 low:mr-3 lowtwo:mr-0 lowtwo2-1:text-[10px]'>
                        <div className='progressBar flex gap-2 majorfour:ml-4'>
                            <p className='PcurrentTime text-gray-300'>
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
                            
                            <p className='Pduration text-white'>
                                {(duration && !isNaN(duration)) && 
                                calculeDuration(duration)}
                            </p>
                        </div> 

                    <div className='buttons flex flex-nowrap text-3xl text-red-900 space-x-3 majorfour:text-[28px]
                    lowtwo2-1:text-[24px]'>
                        <button 
                            onClick={toggleRandom} className='randomMusicsButton'>
                            {isRandom ? <RandomMusicsTrue /> : <RandomMusicsFalse />}
                        </button> 
          
                        <button onClick={playPrevTrack}>
                            <SkipBack />
                        </button>
                        <button 
                            className='playPause' 
                            onClick={togglePlay}>
                                {isPlaying ?  <Pause /> : <Play />}
                        </button>
                        <button onClick={playNextTrack}>
                            <SkipForward />
                        </button>
                        
                    </div>
                </div>
            </div>

            <button onClick={handleModalFxOpen}>
                <PiEqualizer className="text-gray-300 text-3xl midtwo3:hidden" />
            </button>

                <div className='test mr-5 gap-1 flex items-center majorfour:mr-2'>
                <button 
                    className='volumeButton text-gray-300 midfour:hidden' 
                    onClick={toggleMute}>
                    {isMuted ? <VolumeOff/> : <VolumeOn />}
                </button>
                <button 
                    className='volumeButton text-gray-300 hidden midfour:block' 
                    onClick={openModal}>
                    {isMuted ? <VolumeOff/> : <VolumeOn />}
                </button>
                <input
                className="midtwo3:hidden text-gray-300 midtw:w-[76px]"
                    type="range" 
                    step="0.01"
                    onChange={(e) => setVolume(parseFloat(e.target.value))} 
                    value={volume}
                    max='1'
                    min='0' 
                />
                </div>
        </div>
        )
}

export { Player };