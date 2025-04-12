'use client';
import "../../styles/Modal.css"
import { useEffect, useState } from "react";
import { ModalProps } from "@/interfaces";
import usePlayerStore from "@/app/store/playerStore";
import { PiEqualizer } from "react-icons/pi";
import CircularSlider from '@fseehawer/react-circular-slider';
import { Canvas } from '@react-three/fiber';
import Equalizer from 'r3f-equalizer';

const ModalFx: React.FC<ModalProps> = ({
  closeModal,
  isOpen,
  audioRef
}) => {
  const reverbWet = usePlayerStore((s) => s.reverbWet);
  const setReverbWet = usePlayerStore((s) => s.setReverbWet);
  /*const fxEqualizerEnabled = usePlayerStore((s) => s.fxEqualizerEnabled);
  const toggleFxEqualizer = usePlayerStore((s) => s.toggleFxEqualizer);
  */

  if (!isOpen) return null;
  
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(isOpen);
  useEffect(() => setModalIsOpen(isOpen), [isOpen]);

      return (
<div className={`modal-overlay ${modalIsOpen ? 'modal-open' : ''}`} onClick={closeModal}>
      <div className={`modal-content ${modalIsOpen ? 'modal-open' : ''}`} onClick={(e) => e.stopPropagation()}>
      <PiEqualizer size={40} color="blue"/>
        <h1 className="text-xl font-semibold">MIXER</h1>
      <div className="w-full flex gap-3">
        <div className="w-full h-[300px] rounded-xl overflow-hidden border border-slate-700">
            <Equalizer
              amplitude={3}
              audio={audioRef?.current || undefined}
              backgroundColor="#000000"
              cubeSideLength={0.03}
              cubeSpacing={4.5}
              cameraFov={60}
              cameraPosition={[0, 5, 12]}
              gridCols={60}
              gridRows={10}
            />
        </div>
        <div className="reverb-controls flex flex-col">
          <h2 className="text-lg font-semibold">Reverb</h2>
          <div className="flex gap-4">
            <CircularSlider
              width={120}
              label="Reverb"
              min={0}
              max={100}
              knobColor="#3b82f6"
              progressColorFrom="#9333ea"
              progressColorTo="#3b82f6"
              dataIndex={reverbWet * 100}
              onChange={(value) => setReverbWet(Number(value) / 100)}
              
            />
          </div>
        </div>

      </div>
        <button className="text-2xl text-blue-600 font-extrabold bg-slate-300 py-3 px-5 rounded-3xl" onClick={closeModal}>X</button>
      </div>
    </div>
    );
  }

  export default ModalFx;