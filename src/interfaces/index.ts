export interface Album {
    id: string;
    img: string;
    name: string;
    beatsIds: string[];
   dataLnc: string;
   beats: Beat[];
  }
  

export interface Beat {
    id: string;
    name: string;
    album_img: string;
    audio: string;
    genres: string[];
    dataLnc: string;
  }

 export interface ModalProps  {
    closeModal: () => void;
    currentBeatId: string;
    onToggleRandom: () => void;
    onSkipBack: () => void;
    onTogglePlay: () => void;
    onSkipForward: () => void;
    isRandom: boolean;
    isPlaying: boolean | null;
    currentTime: number;
    progressBar: React.RefObject<HTMLInputElement>;
    setCurrentTime: (value: number) => void;
    calculeDuration: (sec: number) => string;
    duration: number | null;
    onChangeRange: () => void;
    isOpen: boolean;
  }

  export interface ModalAlbumProps  {
    closeModal: () => void; 
    isOpen: boolean;
    album: Album;
    beats: Beat[];
    setId: any;
  }