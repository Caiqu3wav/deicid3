'use client';
import { beats } from "@/pages/api/beats";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse, VolumeOff, VolumeOn } from '../../icons/index';
import "./styles.css"

type Props = {
    id: string;
    setId: (e: string) => void;
    className?: string; 
}

export const Player = ({ id, setId }: Props) => {
    const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
    const [volume, setVolume] = useState<string | null>('1');
    const [duration, setDuration] = useState<number | null>(null);
    const [isRandom, setIsRandom] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState<boolean | null>(null);

        const audioTag = useRef<HTMLAudioElement | null>(null);
        const progressBar = useRef<HTMLInputElement | null>(null);
        const animationRef = useRef<number | null>(null);

        useEffect(() => {
            if (id !== '') {
                if (audioTag.current) {
                    if (isPlaying) {
                        audioTag.current.play();
                        animationRef.current = requestAnimationFrame(whilePlaying);               
                        audioTag.current.volume = volume !== null ? parseFloat(volume) : 1;
        
                        if (isMuted) {
                            audioTag.current.muted = true;
                        } else {
                            audioTag.current.muted = false;
                        }

                        const interval = setInterval(() => {
                            if (audioTag.current && progressBar.current) {
                                const seconds = Math.floor(audioTag.current.duration)
                                setDuration(seconds)
                                if (progressBar.current) {
                                    progressBar.current.max = seconds.toString();
                                }
                            }
                        }, 1000);

                        setInterval(() => {
                            if (audioTag.current && duration){
                            if (duration > 0 || duration !== undefined){
                                clearInterval(interval)

                                if (audioTag.current.currentTime === audioTag.current.duration){
                                    isRandom ? skipRandom() : skipForward()
                                }
                            }
                            }
                        }, 1100)
                    } else{
                        if (audioTag.current && volume !== null) {

                        audioTag.current.pause()
                        audioTag.current.volume = parseFloat(volume);
                    }
                        if (animationRef.current !== null){
                        cancelAnimationFrame(animationRef.current);
                        }
                    }
                }
        }
        }, [id, isPlaying, volume, isMuted, duration]);

        const calculeDuration = (sec: number) => {
            const minutes = Math.floor(sec / 60)
            const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
            const seconds = Math.floor(sec % 60)
            const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

            return `${newMinutes}:${newSeconds}`
        }

        const skipForward = () => {
            if (id === '') {
                alert('Escolha um beat!')
            } else if (isRandom) {
                skipRandom()
            } else if (id === '9') {
                setId('1')
            } else {
                const idNum = parseInt(id);
                const newId = idNum + 1;
                setId(newId.toString())
            }
        }

        const skipRandom = () => {
            const idNum = parseInt(id)
            const randomNum = Math.floor(Math.random() * beats.length)
            if (randomNum === 0 || randomNum === idNum){
                const newNum = randomNum + 1
                setId(newNum.toString())
            } else {
                setId(randomNum.toString())
            }
        }

        const skipBack = () => {
            if (id === ''){
                alert('Escolha uma música!')
            } else {
                const idNum = parseInt(id);
                const newId = idNum -1;
                setId(newId.toString())
            }
        }

        const whilePlaying = () => {
            if(audioTag.current && progressBar.current)
            progressBar.current.value = audioTag.current.currentTime.toString();
            animationRef.current = requestAnimationFrame(whilePlaying)
        changeCurrentTime();
        }

        const changeRange = () => {
            if(audioTag.current && progressBar.current)
            audioTag.current.currentTime = parseFloat(progressBar.current.value);
            changeCurrentTime()
        }
        
        const changeCurrentTime = () => {
            if(audioTag.current && progressBar.current)
            setCurrentTime(parseFloat(progressBar.current.value));
        }
        

        return(
            <div className="w-full flex justify-between bg-slate-400">
            
            <div className='musicDiv'>
                
                   {beats.map(beat => (
                        
                        id === beat.id ?
                        
                            <div 
                             className='flex gap-3' key={beat.id}>
                                <>
                                    <img className="w-[50px] h-[50px] majorfour:h-[60px] majorfour:w-[60px] lowtwo2:w-[50px]" src={beat.album_img} />
                                    <div>
                                        <h1>{beat.name}</h1>
                                    </div>
                                </> 
                                
                                <audio src={beat.audio} ref={audioTag}/>
                            </div>    
                                                 
                    : ''
                    ))
                }
            </div>
            <div className='flex items-center'>
                <div className='flex gap-32 mr-[290px] majortwo2:gap-20 majortwo3:gap-10 majortwo3:mr-[190px]
                 majortwo4:mr-0 majorfour:flex-col-reverse majorfour:gap-0 majorfour:items-center majorfour:text-[14px]
                 midtwo3:mr-10 midfour:mr-6 low:mr-3 lowtwo:mr-0 lowtwo2-1:text-[10px]'>
                        <div className='progressBar flex gap-2 majorfour:ml-4'>
                            <p className='PcurrentTime'>
                            {(currentTime !== null) && calculeDuration(currentTime)}
                            </p>
                            <input 
                                type="range" 
                                className='currentProgress'
                                defaultValue='0' 
                                ref={progressBar} 
                                onChange={changeRange}
                            />
                            
                            <p className='Pduration'>
                                {(duration && !isNaN(duration)) && 
                                calculeDuration(duration)}
                            </p>
                        </div> 

                    <div className='buttons flex flex-nowrap text-3xl text-orange-400 space-x-3 majorfour:text-[28px]
                    lowtwo2-1:text-[24px]'>
                        <button 
                            onClick={() => setIsRandom(!isRandom)} className='randomMusicsButton'>
                            {isRandom ? <RandomMusicsTrue /> : <RandomMusicsFalse />}
                        </button> 
          
                        <button onClick={skipBack}>
                            <SkipBack />
                        </button>
                        <button 
                            className='playPause' 
                            onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ?  <Pause /> : <Play />}
                        </button>
                        <button onClick={skipForward}>
                            <SkipForward />
                        </button>
                        
                    </div>
                </div>
            </div>

                <div className='test mr-5 flex items-center majorfour:mr-2'>
                <button 
                    className='volumeButton midfour:hidden ' 
                    onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeOff/> : <VolumeOn />}
                </button>
                <input
                className="volume-input"
                    type="range" 
                    step="0.01"
                    onChange={(e) => setVolume(e.target.value)} 
                    value={volume !== null ? volume.toString() : ''}
                    max='1'
                    min='0' 
                />
                </div>
        </div>
        )
}

