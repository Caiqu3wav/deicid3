'use client';
import { Player } from "./components/player";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import React, { useState } from "react";
import "./page.css";
import Playlist from "./components/playlist";
import Albuns from "./components/albuns/Index";

export default function Home() {
  const [id, setId] = useState<string>('');
  const [pageCategorySelected, setPageCategorySelected] = useState<number>(1);

  const handlePageCategorySelected = (page: number) => {
    setPageCategorySelected(page)
  }
  return (
    <main>
      <Header/>
      <Hero/>
      <div className="playlist-cont h-fit pb-20 flex items-center justify-center flex-col
       majortwo3:pb-24 gap-2">
        <div className="flex gap-6">
        <button onClick={() => handlePageCategorySelected(1)} className={`text-white text-xl font-semibold 
      ${pageCategorySelected === 1 ? "border-solid border-b-2 border-white" : ""}`}>Beats</button>
      <button onClick={() => handlePageCategorySelected(2)} className={`text-white text-xl font-semibold 
      ${pageCategorySelected === 2 ? "border-solid border-b-2 border-white" : ""}`}>Albuns</button>
      </div>
        {pageCategorySelected === 1 && <Playlist setId={setId}/>}
        {pageCategorySelected === 2 && <Albuns/>}
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
