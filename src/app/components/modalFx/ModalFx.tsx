'use client';
import "../../styles/Modal.css"
import CircularSlider from '@fseehawer/react-circular-slider';
import { RiResetLeftFill } from "react-icons/ri";

interface ModalFxProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  reverbAmount: number;
  setReverbAmount: (amount: number) => void;
  playbackRate: number;
  setPlaybackRate: (rate: number) => void;
}

const ModalFx: React.FC<ModalFxProps> = ({ isOpen, setIsOpen, reverbAmount, setReverbAmount, playbackRate,
  setPlaybackRate
 }) => { 
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className="bg-zinc-900 p-6 rounded-lg shadow-lg w-11/12 max-w-md"
        onClick={handleModalClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Audio Effects</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div> 
          <p className="text-gray-400 text-sm mt-4">
            Adjust audio effects to enhance your listening experience. Changes will apply to the current and future tracks.
          </p>
          
          <div className="reverb-controls flex flex-col gap-4 items-center justify-center">
          <h2 className="text-lg font-semibold">Reverb</h2>
          <div className="flex gap-4">
            <CircularSlider
              width={120}
              min={0}
              max={100}
              knobColor="#3b82f6"
              progressColorFrom="#9333ea"
              progressColorTo="#3b82f6"
              dataIndex={reverbAmount * 100}
              onChange={(value) => setReverbAmount(Number(value) / 100)}
            />
          </div>

          <div className="reverb-controls flex flex-col">
          <div className="flex gap-4 items-center justify-center">
            <label htmlFor="rate">Velocidade</label>
            <button onClick={() => setPlaybackRate(1.0)}><RiResetLeftFill size={30} color="white"/></button>
          </div>
                <input
                  id="rate"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.01"
                  value={playbackRate}
                  onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                />
              <span>{playbackRate.toFixed(2)}x</span>
            </div>
         </div>
        </div>
      </div>
  );
};

export default ModalFx;