import { NextApiResponse, NextApiRequest } from "next";

export const albuns = [
    {
        id: '1',
        name: 'Interestelar',
        img: '/assets/albuns-img/interestelar.jpg',
        beats: ['124', '135', '123', '108', '122', '134', '112', '131', '129'],
        dataLnc: '2024/05/24',
    },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      res.status(200).json(albuns);
    } else {
      res.status(405).end();
    }
  }