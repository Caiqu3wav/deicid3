'use client';
import { useState } from 'react';
import { beats } from '../../api/beats/route';
import { Player } from '../player/index';
import { BeatsCard } from '../musics/index';
import "./styles.css"

export default function Home() {
  const [id, setId] = useState<string>('')

  return (
    <main className="">
      <div>
      <div>

        <div className='top'>
          <div className='divSongs'>
            <div className='grid grid-cols-4'>
            {beats.map(beat => (
              <BeatsCard 
                key={beat.id}
                album_img={beat.album_img}
                name={beat.name}
                audio={beat.audio}
                setId={setId}
                beatId={beat.id}
                id={id}
              />
              ))
            }
            </div>
          </div>
        </div>
      </div>
      <div className='fixed-player'>
          <Player 
            id={id}
            setId={setId}
            /> 
            </div>
    </div>
    </main>
  );
}
