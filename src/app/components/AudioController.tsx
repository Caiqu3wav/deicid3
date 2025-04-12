import { useEffect, useRef } from "react";
import usePlayerStore from "@/app/store/playerStore"; // ajuste o caminho

export const AudioController = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    currentTrack,
    isPlaying,
    isMuted,
    volume,
    setProgress,
    setDuration
  } = usePlayerStore();

  // Sincroniza as mudanças de estado com o áudio real
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audio; // ajuste aqui pro campo do seu Beat

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }

    audio.volume = volume;
    audio.muted = isMuted;

  }, [currentTrack, isPlaying, isMuted, volume]);

  // Atualiza progress e duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} hidden />
    </>
  );
};

export default AudioController;
