'use client';
import { beats } from "@/app/api/beats";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse, VolumeOff, VolumeOn } from '../../icons/index';


type Props = {
    id: string;
    setId: (e: string) => void;
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
            const randomNum = Math.floor(Math.random() * 9)
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
            <div className="">
            
            <div className='musicDiv'>
                
                   {beats.map(beat => (
                        
                        id === beat.id ?
                        
                            <div 
                             className='music' key={beat.id}>
                                <>
                                    <img className="w-[50px] h-[50px]" src={beat.album_img} />
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
            <div className='player'>
                <div className='inputButtons'>
                        <div className='progressBar'>
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

                    <div className='buttons'>
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

                <div className='test'>
                <button 
                    className='volumeButton' 
                    onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeOff/> : <VolumeOn />}
                </button>
                <input
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

