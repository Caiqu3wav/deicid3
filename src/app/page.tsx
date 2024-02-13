'use client';
import { Player } from "./components/player";
import Header from "./components/header/Header";
import { BeatsCard } from "./components/musics";
import Hero from "./components/hero/Hero";
import { useState, useEffect } from "react";
import "./page.css";

interface Beat {
  id: string;
  album_img: string;
  name: string;
  audio: string;
  dataLnc: string; // Adicione outras propriedades, se necessário
}

export default function Home() {
  const [id, setId] = useState<string>('');
  const [ordenacao, setOrdenacao] = useState<string>("recentes"); // Defina o padrão como "recentes"
  const [beats, setBeats] = useState<Beat[]>([]);


  useEffect(() => {
    async function fetchBeats() {
      try {
        const response = await fetch('/api/beats');
        const data = await response.json();

        const beatsOrdenados = data.sort((a: { dataLnc: string | number | Date; }, b: { dataLnc: string | number | Date; }) => {
          const dataA = new Date(a.dataLnc).getTime();
          const dataB = new Date(b.dataLnc).getTime();

          return ordenacao === 'recentes' ? dataB - dataA : dataA - dataB;
        });

        setBeats(beatsOrdenados);
      } catch (error) {
        console.error('Erro ao buscar beats', error);
      }
    }

    fetchBeats();
  }, [ordenacao]);


  return (
    <main>
      <Header/>
      <Hero/>
      <div className="playlist-cont h-fit pb-20 flex items-center justify-center flex-col">
      <div>
          <label>Ordenar por:</label>
          <select onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="recentes">Recentes</option>
            <option value="antigos">Antigos</option>
          </select>
        </div>
          <div className='divSongs mt-5'>
            <div className='grid grid-cols-4 gap-20'>
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
<footer>         
   <Player 
     id={id}
    setId={setId}
    /> 
</footer>      
</main>
  );
}
