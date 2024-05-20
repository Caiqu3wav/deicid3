export interface Album {
    id: string;
    img: string;
    name: string;
    dataLnc: string;
    beats: string[];
  }
  

export interface Beat {
    id: string;
    album_img: string;
    name: string;
    audio: string;
    dataLnc: string;
    genres: [];
  }