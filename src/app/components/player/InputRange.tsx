import React from 'react'
import { useState, useRef } from 'react';

export default function InputRange() {
    const [currentTime, setCurrentTime] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
   
    const calculeDuration = (sec: number) => {
        const minutes = Math.floor(sec / 60)
        const newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(sec % 60)
        const newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

        return `${newMinutes}:${newSeconds}`
    }

    const changeRange = () => {
        if (audioTag.current && progressBar.current) {
          const value = parseFloat(progressBar.current.value);
          audioTag.current.currentTime = value;
          setCurrentTime(value);
        }
      };
    
    const changeCurrentTime = () => {
        if(audioTag.current && progressBar.current)
        setCurrentTime(parseFloat(progressBar.current.value));
    }

    const audioTag = useRef<HTMLAudioElement | null>(null);
    const progressBar = useRef<HTMLInputElement | null>(null);
    const animationRef = useRef<number | null>(null);



  return (
    <>
      <div className='progressBar flex gap-2 majorfour:ml-4'>
                            <p className='PcurrentTime'>
                            {(currentTime !== null) && calculeDuration(currentTime)}
                            </p>
                            <input 
                                type="range" 
                                className='currentProgress'
                                value={currentTime !== null ? currentTime.toString() : '0'} 
                                ref={progressBar} 
                                onChange={changeRange}
                            />
                            
                            <p className='Pduration'>
                                {(duration && !isNaN(duration)) && 
                                calculeDuration(duration)}
                            </p>
                        </div> 
    </>
  )
}
