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
    isOpen: boolean;
    audioRef: any
  }

  export interface ModalAlbumProps  {
    closeModal: () => void; 
    isOpen: boolean;
    album: Album;
    beats: Beat[];
    setId: any;
  }