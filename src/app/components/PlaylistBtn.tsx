'use client'
import { useState } from "react";
import { PiPlaylistFill } from "react-icons/pi";
import Playlist from "./PlaylistModal";
import usePlayerStore from "../store/playerStore";

export default function PlaylistBtn() {
  const {
    playlist
  } = usePlayerStore((state) => ({
    playlist: state.playlist
  }))
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
    <button className={`fixed bottom-20 right-3 
     text-purple-800 text-6xl cursor-pointer z-[51] transition-all duration-700
     ${playlist.length < 1 ? 'hidden opacity-0' : 'block opacity-100'}`} onClick={isModalVisible ? handleCloseModal : handleOpenModal}>
      <PiPlaylistFill/>
    </button>
    <Playlist isVisible={isModalVisible} onClose={handleCloseModal}/>
    </>
  )
}