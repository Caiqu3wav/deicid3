import Link from "next/link";
import { useState, useEffect } from "react";
import { Album, Beat } from "@/interfaces";
import { FaPlay } from "react-icons/fa";
import { TbPlaylist } from "react-icons/tb";


type AlbumCardProps = {
    album: Album
    setId: (e: string) => void;
}

 const AlbumCard = ({album, setId}: AlbumCardProps) => {
  

    return (
        <div className="flex flex-col items-center justify-center">
        <div className='bg-gradient-to-b from-blue-800 to-black bg-opacity-75 transition-all duration-700
         hover:bg-orange-300 hover:bg-opacity-95 flex flex-col w-[270px] h-[300px] items-center justify-center
        rounded-xl cursor-pointer midtwo2:w-[200px] midtwo2:h-[250px] midfour1:w-[168px] midfour1:h-[240px]
        lowtwo1:w-[230px] lowtwo1:h-[280px]'>
                            <img className="beats-img rounded-lg w-[200px] h-[200px] midtwo2:w-[160px] midtwo2:h-[160px]
                            midfour1:w-[130px] midfour1:h-[130px] lowtwo:h-[130px] lowtwo1:w-[200px] lowtwo1:h-[200px]
                            " src={album.img} alt={album.name} />
                            <h1 className='text-2xl self-center text-slate-500'>{album.name}</h1>
                            <div className="flex justify-center">
                        <button className="bg-orange-500 transition-colors hover:bg-gray-300 text-gray-800 font-bold py-1 px-3
                         midtwo2:py-0 midtwo2:px-2 rounded-full">
                        <FaPlay/>
                        </button>
                        <button className="bg-orange-500 transition-colors hover:bg-gray-300 text-gray-800 font-bold py-2 px-4
                        midtwo2:py-0 midtwo2:px-2 rounded ml-4">
                        <TbPlaylist size={20}/>
                        </button>
                    </div>
                    <p className="text-white text-sm px-1">Lançamento: {album.dataLnc}</p>
                        </div> 
                    </div>
    )
}

export default AlbumCard;