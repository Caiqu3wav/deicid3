'use client';
import useAudioFx from "@/app/Audio";
import "../../styles/Modal.css"

interface ModalFxProps {
  closeModal: () => void;
  isOpen: boolean;
  toggleFx: () => void; 
  audioFx: ReturnType<typeof useAudioFx>;
}

const ModalFx: React.FC<ModalFxProps> = ({ closeModal, isOpen, toggleFx, audioFx }) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-zinc-900 p-6 rounded-lg shadow-lg w-11/12 max-w-md"
        onClick={handleModalClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Audio Effects</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <button
        onClick={toggleFx}
        className={`p-2 px-4 rounded ${
          audioFx.isFxEnabled ? "bg-green-600" : "bg-gray-600"
        } text-white`}
      ></button>

          {/* Reverb Controls */}
          <div className="mt-4 text-white">
            <label htmlFor="wet">Intensidade:</label>
              <input
                id="wet"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioFx.wetLevel}
                onChange={(e) => audioFx.setWetLevel(parseFloat(e.target.value))}
              />
            <p>{Math.round(audioFx.wetLevel * 100)}%</p>
        </div>

          {/* You can add more effect controls here */}
          
          {/* Info text */}
          <p className="text-gray-400 text-sm mt-4">
            Adjust audio effects to enhance your listening experience. Changes will apply to the current and future tracks.
          </p>
        </div>
      </div>
  );
};

export default ModalFx;