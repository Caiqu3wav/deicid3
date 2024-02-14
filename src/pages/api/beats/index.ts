import type { NextApiRequest, NextApiResponse } from 'next'


export const beats = [
  { id: '1', name: 'Purple', album_img: '/assets/img-beats/purple.png', 
    audio: '/assets/beats/(pluggnb)purple_.mp3', genres: ['plugg', 'pluggnb'],
    dataLnc: '2023/01/24',
  },
  { id: '2', name: 'Bounce', album_img: '/assets/img-beats/bounce.png', 
    audio: '/assets/beats/(westcoast)bounce.mp3', genre: 'westcoast',
    dataLnc: '2023/02/27',
  },
  { id: '3', name: 'Ride', album_img: '/assets/img-beats/ride.png', 
    audio: '/assets/beats/(hide)ride.mp3', genres: ['hard', 'gangsta'],
    dataLnc: '2023/03/15',
  },
  { id: '4', name: 'Slay', album_img: '/assets/img-beats/slay.png', 
    audio: '/assets/beats/slay.mp3', genres: ['dark', 'hard'],
    dataLnc: '2023/03/19',
  },
  { id: '5', name: 'Bape', album_img: '/assets/img-beats/bape.png', 
    audio: '/assets/beats/bape.mp3', genres: ['plugg', 'pluggnb'],
    dataLnc: '2023/04/03',
  },
  { id: '6', name: 'Angels', album_img: '/assets/img-beats/angels.png', 
    audio: '/assets/beats/angels.mp3', genres: ['ambient', 'dark', 'melodic', 'sad'],
    dataLnc: '2023/06/28',
  },
  { id: '7', name: 'Glock19', album_img: '/assets/img-beats/glock19.png', 
    audio: '/assets/beats/glock19.mp3', genres: ['dark', 'hard', 'darkplugg'],
    dataLnc: '2023/07/20',
  },
  { id: '8', name: 'Evil', album_img: '/assets/img-beats/evil.png', 
    audio: '/assets/beats/evil.mp3', genres: ['dark', 'hard', 'ambient'],
    dataLnc: '2023/07/22',
  },
  { id: '9', name: 'Xanax Dreams', album_img: '/assets/img-beats/xanaxdreams.jpg', 
    audio: '/assets/beats/XanaxDreams.mp3', genres: ['ambient', 'chill'],
    dataLnc: '2023/07/26',
  },
  { id: '10', name: 'Cristals', album_img: '/assets/img-beats/cristalsbg.jpg', 
    audio: '/assets/beats/cristals.mp3', genres: ['ambient', 'chill'],
    dataLnc: '2023/07/30',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Se for uma requisição GET, envie a lista de beats como resposta
    res.status(200).json(beats);
  } else {
    // Se for qualquer outro método HTTP, retorne um erro não permitido
    res.status(405).end();
  }
}