import usePlayerStore from "../store/playerStore";

export const usePlayerState = () => {
    return usePlayerStore((state) => ({
      currentTrack: state.currentTrack,
      isPlaying: state.isPlaying,
      isMuted: state.isMuted,
      isRandom: state.isRandom,
      volume: state.volume,
      progress: state.progress,
      duration: state.duration,
      toggleMute: state.toggleMute,
      togglePlay: state.togglePlay,
      toggleRandom: state.toggleRandom,
      playNextTrack: state.playNextTrack,
      playPrevTrack: state.playPrevTrack,
      setVolume: state.setVolume,
      setProgress: state.setProgress,
      setDuration: state.setDuration,
      reverbAmount: state.reverbAmount,
      setReverbAmount: state.setReverbAmount,
      setPlaybackRate: state.setPlaybackRate,
      playbackRate: state.playbackRate
    }));
  };