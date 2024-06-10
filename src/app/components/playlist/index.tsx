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
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  
    useEffect(() => {
      async function fetchBeats() {
        try {
          const data = beatsData;
  
          const beatsOrdenados = data.sort((a: { dataLnc: string | number | Date; }, b: { dataLnc: string | number | Date; }) => {
            const dataA = new Date(a.dataLnc).getTime();
            const dataB = new Date(b.dataLnc).getTime();
  
            return ordenacao === 'recentes' ? dataB - dataA : dataA - dataB;
          });
  
          const initialFilteredBeats = beatsOrdenados.filter(beat => {
            if (selectedGenres.length === 0 || selectedGenres.includes('todos')) {
                return true;
            }
            return selectedGenres.some(selectedGenre => beat.genres.includes(selectedGenre));
        });
  
          setBeats(initialFilteredBeats);
          const totalFilteredPages = Math.ceil(initialFilteredBeats.length / beatsPerPage);
          setTotalFilteredPages(totalFilteredPages);
          setLoading(false);
        } catch (error) {
            setError('Erro ao buscar beats');
          console.error('Erro ao buscar beats', error);
          setLoading(false);
        }
      }
  
      fetchBeats();
    }, [ordenacao, selectedGenres]);
  
    const indexOfLastBeat = currentPage * beatsPerPage;
    const indexOfFirstBeat = indexOfLastBeat - beatsPerPage;
    const currentBeats = beats.slice(indexOfFirstBeat, indexOfLastBeat);
    const totalPages = Math.ceil(beats.length / beatsPerPage);
  
    const filteredBeats = currentBeats.filter((beat) => {
      if (selectedGenres.length === 0 || selectedGenres.includes('todos')) {
        return true;
      }
      return selectedGenres.some((selectedGenre) => beat.genres.includes(selectedGenre as never));
    });
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalFilteredPages) {
        setCurrentPage(page);
      }
    };
  
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectedGenres(selectedOptions);
  
    if (selectedOptions) {
      setCurrentPage(1)
    }
  };


  
  return (
    <>
      <div id="playlist" className="flex gap-3 low:gap-0 lowone:flex-col lowone:gap-3 lowone:mt-2">
          <div className="flex gap-2">
          <label className="text-white low:text-[14px]">Ordenar por:</label>
          <select onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="recentes">Recentes</option>
            <option value="antigos">Antigos</option>
          </select>
          </div>
          <div className="flex gap-3 ml-4 midfour:gap-0 low:ml-2">
          <label className="text-white low:text-[14px] lowtwo:mr-2">Estilo:</label>
          <div className="genre-selector-container">
              <select onChange={handleGenreChange} value={selectedGenres.join(',')}>
                {/* Opções de gêneros, incluindo "Todos" */}
                {['todos', ...Array.from(new Set(beats.flatMap((beat) => beat.genres)))].map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === 'todos' ? 'Todos' : genre}
                  </option>
                ))}
              </select>
            </div>
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
           majortwo1-2:grid-cols-3 majortwo1-2:gap-16 majorthree:gap-[5%]
            majorthree2:grid-cols-2 lowtwo:grid-cols-1'>
            {filteredBeats.map(beat => (
              <BeatsCard 
                key={beat.id}
                beat={beat}
              />
              ))
            }
            </div>
          </div>
          <div className="pagination mt-4 flex gap-4 majorthree:mt-28 majorthree2:mt-48">
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
    </>
  )
}

export default Playlist;