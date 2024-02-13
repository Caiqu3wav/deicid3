'use client';
import * as C from "./components/playlist/styles";
import { Player } from "./components/player";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Playlist from "./components/playlist/Playlist"
import { useState, useEffect } from "react";

export default function Home() {
  
    
  return (
    <main>
      <Header/>
      <Hero/>
      <Playlist/>
      </main>
  );
}
