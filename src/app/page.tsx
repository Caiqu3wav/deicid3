'use client';
import { Player } from "./components/player";
import Header from "./components/header/Header";
import { BeatsCard } from "./components/musics";
import Hero from "./components/hero/Hero";
import { useState, useEffect } from "react";
import "./page.css";
import { SkipBack } from "./icons";
import { SkipForward } from "./icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Beat {
  id: string;
  album_img: string;
  name: string;
  audio: string;
  dataLnc: string;
}

export default function Home() {
  const [id, setId] = useState<string>('');
  const [ordenacao, setOrdenacao] = useState<string>("recentes"); 
  const [beats, setBeats] = useState<Beat[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const beatsPerPage = 8;
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBeats() {
      try {
        const response = await fetch("/api/beats");
        const data = await response.json();

        const beatsOrdenados = data.sort((a: { dataLnc: string | number | Date; }, b: { dataLnc: string | number | Date; }) => {
          const dataA = new Date(a.dataLnc).getTime();
          const dataB = new Date(b.dataLnc).getTime();

          return ordenacao === 'recentes' ? dataB - dataA : dataA - dataB;
        });

        setBeats(beatsOrdenados);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar beats', error);
        setLoading(false);
      }
    }

    fetchBeats();
  }, [ordenacao]);

  const indexOfLastBeat = currentPage * beatsPerPage;
  const indexOfFirstBeat = indexOfLastBeat - beatsPerPage;
  const currentBeats = beats.slice(indexOfFirstBeat, indexOfLastBeat);
  const totalPages = Math.ceil(beats.length / beatsPerPage);

const handlePageChange = (page: number) => {
  setCurrentPage(page);
};


  return (
    <main>
      <Header/>
      <Hero/>
      <div className="playlist-cont h-fit pb-20 flex items-center justify-center flex-col
       majortwo3:pb-24 ">
      <div id="playlist" className="flex gap-3">
          <label className="text-white">Ordenar por:</label>
          <select onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="recentes">Recentes</option>
            <option value="antigos">Antigos</option>
          </select>
        </div>
        {loading && (
        <div className="flex flex-col items-center">
          <p className="text-white">Carregando...</p>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='divSongs mt-5'>
            <div className='grid grid-cols-4 gap-20 major1:gap-10 majortwo1:gap-4
           majortwo1-2:grid-cols-3 majortwo1-2:gap-16 majorthree:gap-[5%]
            majorthree2:grid-cols-2 lowtwo1:grid-cols-1'>
            {currentBeats.map(beat => (
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
          <div className="pagination mt-3 flex gap-4 majorthree:mt-20 majorthree2:mt-40">
          <button className="cursor-pointer bg-slate-400 rounded-2xl p-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <SkipBack/>
          </button>
          <span className="text-xl">Página {currentPage} de {totalPages}</span>
          <button className="cursor-pointer bg-slate-400 rounded-2xl p-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <SkipForward/>
          </button>
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
