'use client'
import { useEffect, useState } from "react";
import { ModalAlbumProps } from "@/interfaces";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, RandomMusicsTrue, RandomMusicsFalse } from '@/app/icons/index';
import "../styles/Modal.css";

export default function ModalAlbum({isOpen, closeModal, album, beats, setId}: ModalAlbumProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(isOpen);

    if (!isOpen) {
        return null;
      }

  return (
    <div className={`modal-overlay ${modalIsOpen ? 'modal-open' : ''}`} onClick={closeModal}>
      <div className={`modal-album-content max-h-[400px] overflow-y-scroll ${modalIsOpen ? 'modal-open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex w-full gap-4">
        <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2">
        <Image className="rounded-xl w-[70px] h-[70px]" src={album.img} alt={album.name} width={200} height={200} />
        </div>
        <div>
        <h1 className="text-lg font-semibold text-blue-600">Álbum</h1>
        <p className="text-[40px] font-bold">{album.name}</p>
        <div className="flex gap-4 items-center">
        <p className="font-bold underline underline-offset-1">{album.dataLnc}</p>
        <p className="font-semibold">{album.beatsIds.length} beats</p>
        </div>
        </div>
        </div>
        <button className="text-2xl flex items-center text-blue-600 font-extrabold bg-slate-300 py-0 px-2 h-[30px] rounded-3xl" onClick={closeModal}>X</button>
        </div>
        <hr className="text-gray-600 border-solid border-gray-600 border-2 rounded-lg w-full mt-2" />
        <ol type="1" className="w-full h-fit gap-1 mt-2">
                    {beats.map((beat, index) => (
                    <li key={beat.id} className="mb-2 border-solid border-gray-600 border-b-2 bg-black bg-opacity-45 rounded-xl
                    cursor-pointer hover-relative">
                    <div className="flex w-full gap-2">
                        <p className="text-blue-700 font-bold pl-1">{index + 1}</p>
                        <img src={album.img} className="w-[30px] h-auto" alt="" />
                        <p className=" text-blue-700 font-semibold">{beat.name}</p>
                    </div>
                    </li>              
                    ))}                   
                    </ol>
      </div>
    </div>
  )
}