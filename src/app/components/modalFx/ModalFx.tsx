'use client';
import "../../styles/Modal.css"

interface ModalFxProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  reverbAmount: number;
  setReverbAmount: (amount: number) => void;
}

const ModalFx: React.FC<ModalFxProps> = ({ isOpen, setIsOpen, reverbAmount, setReverbAmount }) => { 
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

          <div className="flex flex-col gap-2 text-white">
          <label htmlFor="reverb">Reverb</label>
            <input
              id="reverb"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={reverbAmount}
              onChange={(e) => setReverbAmount(parseFloat(e.target.value))}
            />
          </div>'
        </div>
      </div>
  );
};

export default ModalFx;