import React, { useState, useEffect } from "react";
import { BeatsCard } from "../musics";
import { SkipBack, SkipForward } from "@/app/icons";
import { beats as beatsData } from "@/app/api/beats";
import { Beat } from "@/interfaces";
import usePlayerStore from "@/app/store/playerStore";

const Playlist: React.FC = () => {
    const [ordenacao, setOrdenacao] = useState<string>("recentes"); 
    const [beats, setBeats] = useState<Beat[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalFilteredPages, setTotalFilteredPages] = useState<number>(1);
    const beatsPerPage = 8;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchBeats() {
        try {
          const data = beatsData;
  
          setBeats(data);
          const totalFilteredPages = Math.ceil(data.length / beatsPerPage);
          setTotalFilteredPages(totalFilteredPages);
          setLoading(false);
        } catch (error) {
            setError('Erro ao buscar beats');
          console.error('Erro ao buscar beats', error);
          setLoading(false);
        }
      }
  
      fetchBeats();
    }, [ordenacao]);
  
    const totalPages = Math.ceil(beats.length / beatsPerPage);
    const beatsSlicePage = ordenacao == "recentes" ? beats.slice((currentPage - 1) * beatsPerPage, currentPage * beatsPerPage)
    : beats.toReversed().slice((currentPage - 1) * beatsPerPage, currentPage * beatsPerPage)
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalFilteredPages) {
        setCurrentPage(page);
      }
    };

  
  return (
    <div className="h-fit flex flex-col items-center justify-center">
      <div id="playlist" className="flex gap-3 low:gap-0 lowone:flex-col lowone:gap-3 lowone:mt-2">
          <div className="flex gap-2">
          <label className="text-white low:text-[14px]">Ordenar por:</label>
          <select className=" bg-slate-900 text-white low:text-[14px]" onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="recentes">Recentes</option>
            <option value="antigos">Antigos</option>
          </select>
          </div>
      </div>
        {loading && (
        <div className="flex flex-col items-center">
          <p className="text-white">Carregando...</p>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='divSongs mt-5 lowone:mt-2'>
            <div className='grid grid-cols-4 gap-20 major1:gap-10 majortwo1:gap-4
           majortwo1-2:grid-cols-3 majortwo1-2:gap-16
            majorfour1:grid-cols-2 lowone:gap-8'>
            {beatsSlicePage.map(beat => (
              <BeatsCard 
                key={beat.id}
                beat={beat}
              />
              ))
            }
            </div>
          </div>
          <div className="pagination mt-8   flex gap-4 ">
          <button className="cursor-pointer transition-colors duration-700 hover:bg-orange-600
           hover:text-white bg-slate-400 rounded-2xl p-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <SkipBack/>
          </button>
          <span className="text-xl">Página {currentPage} de {totalFilteredPages}</span>
          <button className="cursor-pointer transition-colors duration-700 hover:bg-orange-600
           hover:text-white bg-slate-400 rounded-2xl p-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <SkipForward/>
          </button>
        </div>
    </div>
  )
}

export default Playlist;