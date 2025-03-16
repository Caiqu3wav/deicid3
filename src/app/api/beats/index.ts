import type { NextApiRequest, NextApiResponse } from 'next'

export const beats = [
  {
    "id": "1",
    "name": "2 tones",
    "album_img": "/assets/newbeats/img/2tones.webp",
    "audio": "/assets/newbeats/2 tones(140bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "2",
    "name": "astral",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/astral(158bpm)prod.deicide.mp3", 
    "dataLnc": "2025-03-16"
  },
  {
    "id": "3",
    "name": "aurora",
    "album_img": "/assets/newbeats/img/aurora.webp",
    "audio": "/assets/newbeats/aurora(144bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "4",
    "name": "away from me",
    "album_img": "/assets/newbeats/img/awayfromme.webp",
    "audio": "/assets/newbeats/away from me(158bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "5",
    "name": "constelation",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/constelation(161bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "6",
    "name": "cristal",
    "album_img": "/assets/newbeats/img/cristal.webp",
    "audio": "/assets/newbeats/cristal(147bpm)(Am) prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "7",
    "name": "darkna",
    "album_img": "/assets/newbeats/img/darkna.webp",
    "audio": "/assets/newbeats/darkna(147bpm)prod.deicide x mabbienne.mp3",        
    "dataLnc": "2025-03-16"
  },
  {
    "id": "8",
    "name": "drugs and the universe",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/drugs and the universe(158bpm)prod.deicide.mp3",    
    "dataLnc": "2025-03-16"
  },
  {
    "id": "10",
    "name": "frozy",
    "album_img": "/assets/newbeats/img/frozy.jpg",
    "audio": "/assets/newbeats/frozy(142bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "11",
    "name": "god",
    "album_img": "/assets/newbeats/img/god.jpg",
    "audio": "/assets/newbeats/god(148bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "12",
    "name": "golden",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/golden(144bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "13",
    "name": "heaven",
    "album_img": "/assets/newbeats/img/heaven.jpg",
    "audio": "/assets/newbeats/heaven(140bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "14",
    "name": "idea",
    "album_img": "/assets/newbeats/img/idea.webp",
    "audio": "/assets/newbeats/idea(146bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "15",
    "name": "in the night",
    "album_img": "/assets/newbeats/img/inthenight.jpg",
    "audio": "/assets/newbeats/in the night(147bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "16",
    "name": "internalize",
    "album_img": "/assets/newbeats/img/internalize.webp",
    "audio": "/assets/newbeats/internalize(147bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "17",
    "name": "monument",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/monument(146bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "18",
    "name": "netune",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/netune(150bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "19",
    "name": "omnitrix",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/omnitrix(142bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "20",
    "name": "portal",
    "album_img": "/assets/newbeats/img/portal.png",
    "audio": "/assets/newbeats/portal(148bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "21",
    "name": "r4ve",
    "album_img": "/assets/newbeats/img/r4ve.webp",
    "audio": "/assets/newbeats/r4ve(145bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "22",
    "name": "ruinas",
    "album_img": "/assets/newbeats/img/ruinas.webp",
    "audio": "/assets/newbeats/ruinas(148bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "24",
    "name": "starfield",
    "album_img": "/assets/newbeats/img/starfield.webp",
    "audio": "/assets/newbeats/starfield(140bpm).mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "25",
    "name": "sun goes down",
    "album_img": "/assets/newbeats/img/sungoesdown.webp",
    "audio": "/assets/newbeats/sun goes down(154bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "26",
    "name": "syberia",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/syberia(160bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "27",
    "name": "synthetica",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/synthetica(148bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "28",
    "name": "trance",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/trance(146bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "29",
    "name": "transitation",
    "album_img": "/assets/newbeats/img/transitation.webp",
    "audio": "/assets/newbeats/transitation(148bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "30",
    "name": "venus",
    "album_img": "/assets/img-beats/purple.png",
    "audio": "/assets/newbeats/venus(145bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "31",
    "name": "Waves of Clarity",
    "album_img": "/assets/newbeats/img/wavesofclarity.webp",
    "audio": "/assets/newbeats/Waves of Clarity(140bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  },
  {
    "id": "32",
    "name": "world",
    "album_img": "/assets/newbeats/img/world.webp",
    "audio": "/assets/newbeats/world(160bpm)prod.deicide.mp3",
    "dataLnc": "2025-03-16"
  }
].sort((a, b) => parseInt(a.id) - parseInt(b.id));


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(beats);
  } else {
    res.status(405).end();
  }
}