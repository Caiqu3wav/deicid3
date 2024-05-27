import { useEffect, useState } from "react";
import AlbumCard from './AlbumCard';
import { Album } from "@/interfaces";
import { beats } from "@/pages/api/beats";


interface Props {
  setId: any;
}

export default function Albuns({setId}: Props) {
  const [ordenacao, setOrdenacao] = useState<string>("recentes"); 
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchAlbuns() {
      try {
        const response = await fetch("/api/albuns");
        const data = await response.json();

        setAlbuns (data)
        setLoading(false);
      } catch (error) {
          setError('Erro ao buscar albuns');
        console.error('Erro ao buscar albuns', error);
        setLoading(false);
      }
}
fetchAlbuns();
}, []);



return (
  <div className="bg-black w-[77%] self-center min-h-[500px] rounded-xl">
    {loading ? (
      <div className="flex flex-col items-center">
        <p className="text-white">Carregando...</p>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    ) : (
      <ul>
        {albuns.map((album) => (
          <li key={album.id}>
            <AlbumCard album={album} setId={setId} beats={album.beats} />
          </li>
        ))}
      </ul>
    )}
  </div>
);
}