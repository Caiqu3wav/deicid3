'use client';
import "../../styles/Modal.css"

interface ModalFxProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  toggleReverb: () => void;
  isReverbEnabled: boolean;
}

const ModalFx: React.FC<ModalFxProps> = ({ isOpen, setIsOpen, toggleReverb, isReverbEnabled }) => { 
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
/*    <button onClick={toggleReverb}>
        {isReverbEnabled ? 'Disable Reverb' : 'Enable Reverb'}
      </button>
          <p className="text-gray-400 text-sm mt-4">
            Adjust audio effects to enhance your listening experience. Changes will apply to the current and future tracks.
          </p>
        </div>
      </div>
  );
};

export default ModalFx;