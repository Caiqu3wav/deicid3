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
    genres?: string[] | null;
    dataLnc: string;
  }

 export interface ModalFxProps  {
    closeModal: () => void;
    isOpen: boolean;
  }

  export interface ModalProps extends ModalFxProps  {
    audioRef: any;
  }

  export interface ModalAlbumProps  {
    closeModal: () => void; 
    isOpen: boolean;
    album: Album;
    beats: Beat[];
    playAlbum: () => void;
  }