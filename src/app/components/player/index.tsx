'use client';
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse, VolumeOff, VolumeOn } from '../../icons/index';
import Modal from "../modal/Modal";
import React from "react";
import { PiEqualizer } from "react-icons/pi"
import ModalFx from  "../modalFx/ModalFx"
import {usePlayerState} from '../../utils/index'
import Pizzicato from 'pizzicato'

const Player: React.FC = () => {
    const {
        currentTrack, isPlaying, isMuted,
        isRandom, volume, progress,
        duration, toggleMute, togglePlay, toggleRandom,
        playNextTrack, playPrevTrack, setVolume, setProgress,
        setDuration,
      } = usePlayerState();

    const pizziSoundRef = useRef<Pizzicato.Sound | null | any>(null);
    const reverbEffectRef = useRef<Pizzicato.Effects.Reverb | null>(null);
    const [isReverbEnabled, setIsReverbEnabled] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenFx, setIsModalOpenFx] = useState(false);
    
    useEffect(() => {
        if (currentTrack?.audio) {
          initializePizzicatoSound(currentTrack.audio);
        }
      }, [currentTrack]);

      useEffect(() => {
        if (!pizziSoundRef.current) return;
      
        if (isPlaying) {
          Pizzicato.context.resume().then(() => {
            pizziSoundRef.current?.play();
          });
        } else {
          pizziSoundRef.current.pause();
        }
      
        pizziSoundRef.current.volume = isMuted ? 0 : volume;

        let animationFrameId: number;
      
        const updateProgress = () => {
            if (pizziSoundRef.current && isPlaying) {
              const contextTime = pizziSoundRef.current?.currentTime;
              if (typeof contextTime === 'number') {
                setProgress(contextTime);
              }
            }
            animationFrameId = requestAnimationFrame(updateProgress);
          };

          const loop = () => {
            updateProgress();
            animationFrameId = requestAnimationFrame(loop);
          };
        
          if (isPlaying) {
            animationFrameId = requestAnimationFrame(updateProgress);
          }
        
          return () => cancelAnimationFrame(animationFrameId);
          }, [isPlaying, volume, isMuted]);
      
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

        const initializePizzicatoSound = (audioUrl: string) => {
            if (pizziSoundRef.current) {
              pizziSoundRef.current.stop();
              pizziSoundRef.current.disconnect();
            }
          
            const sound = new Pizzicato.Sound(
              {
                source: 'file',
                options: { path: audioUrl }
              },
              (error) => {
                if (error) {
                  console.error('Erro ao carregar o som:', error);
                  return;
                }
          
                console.log("Som carregado com sucesso.");
                pizziSoundRef.current = sound;
                pizziSoundRef.current.volume = isMuted ? 0 : volume;
          
                if (isPlaying) {
                  Pizzicato.context.resume().then(() => {
                    pizziSoundRef.current?.play();
                  });
                }
              }
            );
          };
      
        const applyReverb = () => {
            if (!pizziSoundRef.current) return;
      
            if (!reverbEffectRef.current) {
               reverbEffectRef.current = new Pizzicato.Effects.Reverb({
                  time: 1.0, // Reverb time
                  decay: 1.5,
                  mix: 0.8, // Wet/dry mix
                  reverse: false
               });
            }
            pizziSoundRef.current.addEffect(reverbEffectRef.current);
        };
      
        const removeReverb = () => {
           if (pizziSoundRef.current && reverbEffectRef.current) {
               pizziSoundRef.current.removeEffect(reverbEffectRef.current);
               // Optional: Dispose of the effect if you won't reuse the exact instance
               // reverbEffectRef.current = null;
           }
        };
      
        const toggleReverb = () => {
           const newState = !isReverbEnabled;
           setIsReverbEnabled(newState);
           if (newState) {
               applyReverb();
           } else {
               removeReverb();
           }
        };

        return(
            <div className="w-full flex justify-between bg-black rounded-md">
            
            <div className='musicDiv'>
                
            <div className='flex gap-3' key={currentTrack?.id}>
                                <>
                                {currentTrack && (
                                   <button className="flex flex-nowrap gap-1" onClick={() => setIsModalOpen(!isModalOpen)}>
                                    <img className="w-[50px] h-[50px] majorfour:h-[60px] majorfour:w-[60px] lowtwo2:w-[50px]" src={currentTrack.album_img} />
                                    <div>
                                        <h1 className="text-gray-300">{currentTrack.name}</h1>
                                    </div>
                                    </button>
                                          )}

                                </>
                                {isModalOpen && (
                                        <Modal
                                       setIsOpen={setIsModalOpen}
                                       isOpen={isModalOpen}      
                                       audioRef={audioRef}                                 
                                        />
                                        )}
                                {isModalOpenFx && (
                                        <ModalFx
                                       setIsOpen={setIsModalOpenFx}
                                       isOpen={isModalOpenFx}
                                       toggleReverb={toggleReverb}
                                       isReverbEnabled={isReverbEnabled}
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
                    onClick={toggleMute}>
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