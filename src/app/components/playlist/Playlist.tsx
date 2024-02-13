'use client';
import {useEffect, useState} from 'react';
import { beats } from '../../api/beats';
import { Player } from '../player/index';
import { BeatsCard } from '../musics/index';

export default function Home() {
  const [id, setId] = useState<string>('')

  return (
    <main className="">
      <div>
      <div>

        <div className='top'>
            <>

            <h1 className='searchH1'>Search for music name, author or genre </h1> 
            </> 
            <>
            </>
          <div className='divSongs'>
            <div>
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
          <Player 
            id={id}
            setId={setId}
          /> 

    </div>
    </main>
  );
}
