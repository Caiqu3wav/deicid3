import type { NextApiRequest, NextApiResponse } from 'next'

export const beats = [
  {
    "id": "2",
    "name": "2099",
    "album_img": "/assets/newbeats/img/2099.webp",
    "audio": "/assets/newbeats/2099(155bpm)prod.deicide.mp3",
    "dataLnc": "16/03/2025, 19:54"
  },
  {
    "id": "3",
    "name": "Absent",
    "album_img": "/assets/newbeats/img/absent.png",
    "audio": "/assets/newbeats/absent(144bpm)prod.deicide.mp3",
    "dataLnc": "18/03/2025, 15:13"
  },
  {
    "id": "11",
    "name": "Enoent",
    "album_img": "/assets/newbeats/img/enoent.jpg",
    "audio": "/assets/newbeats/enoent(146bpm)prod.deicide.mp3",
    "dataLnc": "15/03/2025, 20:10"
  },
  {
    "id": "4",
    "name": "Astral",
    "album_img": "/assets/newbeats/img/astral.png",
    "audio": "/assets/newbeats/astral(158bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "19",
    "name": "Inner",
    "album_img": "/assets/newbeats/img/inner.png",
    "audio": "/assets/newbeats/inner(144bpm)prod.deicide.mp3",
    "dataLnc": "25/02/2025, 21:12"
  },
  {
    "id": "5",
    "name": "Aurora",
    "album_img": "/assets/newbeats/img/aurora.webp",
    "audio": "/assets/newbeats/aurora(144bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "23",
    "name": "Omnitrix",
    "album_img": "/assets/newbeats/img/omnitrix.png",
    "audio": "/assets/newbeats/omnitrix(142bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "34",
    "name": "Waves of Clarity",
    "album_img": "/assets/newbeats/img/wavesofclarity.webp",
    "audio": "/assets/newbeats/Waves of Clarity(140bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "6",
    "name": "Away from me",
    "album_img": "/assets/newbeats/img/awayfromme.webp",
    "audio": "/assets/newbeats/away from me(158bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "18",
    "name": "In the night",
    "album_img": "/assets/newbeats/img/inthenight.jpg",
    "audio": "/assets/newbeats/in the night(147bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "1",
    "name": "2 tones",
    "album_img": "/assets/newbeats/img/2tones.webp",
    "audio": "/assets/newbeats/2 tones(140bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "7",
    "name": "Constelation",
    "album_img": "/assets/newbeats/img/constelation.webp",
    "audio": "/assets/newbeats/constelation(161bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "8",
    "name": "Cristal",
    "album_img": "/assets/newbeats/img/cristal.webp",
    "audio": "/assets/newbeats/cristal(147bpm)(Am) prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "9",
    "name": "Darkna",
    "album_img": "/assets/newbeats/img/darkna.webp",
    "audio": "/assets/newbeats/darkna(147bpm)prod.deicide x mabbienne.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "10",
    "name": "Drugs and the universe",
    "album_img": "/assets/newbeats/img/drugsandtheuniverse.webp",
    "audio": "/assets/newbeats/drugs and the universe(158bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  
  {
    "id": "12",
    "name": "Frozy",
    "album_img": "/assets/newbeats/img/frozy.jpg",
    "audio": "/assets/newbeats/frozy(142bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "13",
    "name": "Go planet",
    "album_img": "/assets/newbeats/img/goplanet.png",
    "audio": "/assets/newbeats/go planet(147bpm)prod.deicide.mp3",
    "dataLnc": "16/02/2025, 12:40"
  },
  {
    "id": "14",
    "name": "God",
    "album_img": "/assets/newbeats/img/god.jpg",
    "audio": "/assets/newbeats/god(148bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "15",
    "name": "Golden",
    "album_img": "/assets/newbeats/img/golden.jpg",
    "audio": "/assets/newbeats/golden(144bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "16",
    "name": "Heaven",
    "album_img": "/assets/newbeats/img/heaven.jpg",
    "audio": "/assets/newbeats/heaven(140bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "30",
    "name": "Synthetica",
    "album_img": "/assets/newbeats/img/synthetica.jpg",
    "audio": "/assets/newbeats/synthetica(148bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "17",
    "name": "Idea",
    "album_img": "/assets/newbeats/img/idea.webp",
    "audio": "/assets/newbeats/idea(146bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  
  
  {
    "id": "20",
    "name": "Internalize",
    "album_img": "/assets/newbeats/img/internalize.webp",
    "audio": "/assets/newbeats/internalize(147bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "21",
    "name": "Monument",
    "album_img": "/assets/newbeats/img/monument.jpg",
    "audio": "/assets/newbeats/monument(146bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "22",
    "name": "Netune",
    "album_img": "/assets/newbeats/img/netune.jpg",
    "audio": "/assets/newbeats/netune(150bpm)prod.deicide.mp3",
    "dataLnc": "19/03/2025, 20:53"
  },
  
  {
    "id": "24",
    "name": "Portal",
    "album_img": "/assets/newbeats/img/portal.png",
    "audio": "/assets/newbeats/portal(148bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "25",
    "name": "R4ve",
    "album_img": "/assets/newbeats/img/r4ve.webp",
    "audio": "/assets/newbeats/r4ve(145bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "26",
    "name": "Ruinas",
    "album_img": "/assets/newbeats/img/ruinas.webp",
    "audio": "/assets/newbeats/ruinas(148bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "27",
    "name": "Starfield",
    "album_img": "/assets/newbeats/img/starfield.webp",
    "audio": "/assets/newbeats/starfield(140bpm).mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "28",
    "name": "Sun goes down",
    "album_img": "/assets/newbeats/img/sungoesdown.webp",
    "audio": "/assets/newbeats/sun goes down(154bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "29",
    "name": "Syberia",
    "album_img": "/assets/newbeats/img/syberia.jpg",
    "audio": "/assets/newbeats/syberia(160bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  
  {
    "id": "31",
    "name": "Trance",
    "album_img": "/assets/newbeats/img/trance.png",
    "audio": "/assets/newbeats/trance(146bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "32",
    "name": "Transitation",
    "album_img": "/assets/newbeats/img/transitation.webp",
    "audio": "/assets/newbeats/transitation(148bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  {
    "id": "33",
    "name": "Venus",
    "album_img": "/assets/newbeats/img/venus.webp",
    "audio": "/assets/newbeats/venus(145bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  },
  
  {
    "id": "35",
    "name": "World",
    "album_img": "/assets/newbeats/img/world.webp",
    "audio": "/assets/newbeats/world(160bpm)prod.deicide.mp3",
    "dataLnc": "17/03/2025, 22:25"
  }
];


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(beats);
  } else {
    res.status(405).end();
  }
}