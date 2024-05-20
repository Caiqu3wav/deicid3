'use client';
import { beats } from "@/pages/api/beats";
import "./Modal.css"
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse } from '../../icons/index';
import { useEffect, useState, useRef } from "react";

interface ModalProps  {
  closeModal: () => void;
  currentBeatId: string;
  onToggleRandom: () => void;
  onSkipBack: () => void;
  onTogglePlay: () => void;
  onSkipForward: () => void;
  isRandom: boolean;
  isPlaying: boolean | null;
  currentTime: number;
  progressBar: React.MutableRefObject<HTMLInputElement | null>;
  setCurrentTime: (value: number) => void;
  calculeDuration: (sec: number) => string;
  duration: number | null;
  onChangeRange: React.ChangeEventHandler<HTMLInputElement>;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  closeModal,
  currentBeatId,
  onToggleRandom,
  onSkipBack,
  onTogglePlay,
  onSkipForward,
  isRandom,
  isPlaying,
  currentTime,
  setCurrentTime,
  progressBar,
  calculeDuration,
  duration,
  onChangeRange,
  isOpen,
}) => {

  if (!isOpen) {
    return null;
  }
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(isOpen);
  const currentBeat = beats.find((beat) => beat.id === currentBeatId);


  if(!currentBeat) {
    return null;
  }

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);


  const handleRandom = () =>{
    if(!isRandom){
      onToggleRandom();
    } else if(isRandom){
      onToggleRandom();
    }
  }


    return (
<div className={`modal-overlay ${modalIsOpen ? 'modal-open' : ''}`} onClick={closeModal}>
      <div className={`modal-content ${modalIsOpen ? 'modal-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <Image className="rounded-xl w-[200px] h-[200px]" src={currentBeat.album_img} alt={currentBeat.name} width={200} height={200} />
        <h1 className="text-xl font-semibold">{currentBeat.name}</h1>
        <div className='buttons flex flex-nowrap text-4xl text-orange-400 space-x-3 majorfour:text-[28px]
                    lowtwo2-1:text-[24px]'>
                        <button onClick={handleRandom} className='randomMusicsButton'>
            {isRandom ? <RandomMusicsTrue /> : <RandomMusicsFalse />}
          </button>
          <button onClick={onSkipForward}>
            <SkipBack />
          </button>
          <button className='playPause' onClick={onTogglePlay}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={onSkipBack}>
            <SkipForward />
          </button>
        </div>
        <div className='progressBar flex gap-2 text-xl majorfour:ml-4'>
                            <p className='PcurrentTime'>
                            {(currentTime !== null) && calculeDuration(currentTime)}
                            </p>
                            <input 
                            type="range" 
                            className='currentProgress'
                            value={currentTime !== null ? currentTime.toString() : '0'} 
                            ref={progressBar}
                            onChange={onChangeRange}
                    />
                            
                            <p className='Pduration'>
                                {(duration && !isNaN(duration)) && 
                                calculeDuration(duration)}
                            </p>
                        </div> 
        <button className="text-2xl text-blue-600 font-extrabold bg-slate-300 py-3 px-5 rounded-3xl" onClick={closeModal}>X</button>
      </div>
    </div>
    );
  }

  export default Modal;