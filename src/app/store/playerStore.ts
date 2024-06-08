import { create } from 'zustand';
import { Beat } from '@/interfaces';

interface PlayerState {
    playlist: Beat[];
    currentTrack: Beat | null;
    isPlaying: boolean;
    isMuted: boolean;
    isRandom: boolean;
    volume: number;
  progress: number;
  duration: number;
  addTrack: (track: Beat) => void;
  addTracks: (tracks: Beat[]) => void;
  addTracksAndRemove: (tracks: Beat[]) => void;
  toggleMute: () => void;
  togglePlay: () => void;
  togglePlaylist: (track: Beat) => void; 
  toggleRandom: () => void;
  playTrack: (track: Beat) => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
}

const usePlayerStore = create<PlayerState>((set, get) => ({
    playlist: [],
    currentTrack: null,
    isPlaying: false,
    isMuted: false,
    volume: 1.0,
    progress: 0,
    duration: 0,
    isRandom: false,
    
  addTrack: (track) => set((state) => {
    if (state.playlist.some((t) => t.id === track.id)) return state;
    return { playlist: [...state.playlist, track]};
  }),
  addTracks: (tracks) => set((state) => {
    const newTracks = tracks.filter((track) => !state.playlist.some((t) => t.id === track.id));
    return { playlist: [...state.playlist, ...newTracks] };
}),
  playTrack: (track) => {
    set((state) => {
      if (!state.playlist.some((t) => t.id === track.id)) {
        return { playlist: [...state.playlist, track], currentTrack: track, isPlaying: true };
      }
      return { currentTrack: track, isPlaying: true };
    });
},
  playNextTrack: () => {
    const { playlist, currentTrack, isRandom } = get();
    if (!playlist.length) return;

    let nextTrack;
    if (isRandom) {
      nextTrack = playlist[Math.floor(Math.random() * playlist.length)];
    } else {
      const currentIndex = playlist.findIndex((track) => track.id === currentTrack?.id);
      nextTrack = playlist[(currentIndex + 1) % playlist.length];
    }
    set({ currentTrack: nextTrack });
  },
  playPrevTrack: () => set((state) => {
    const currentIndex = state.playlist.findIndex((t) => t.id === state.currentTrack?.id);
    const nextTrack = state.playlist[currentIndex -1] || state.playlist[0];
    return { currentTrack: nextTrack, isPlaying: true };
  }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  toggleMute() {
      set((state) => ({ isMuted: !state.isMuted }))
  },
  togglePlay() {
      set((state) => ({ isPlaying: !state.isPlaying }))
  },
  togglePlaylist: (track) => set((state) => {
    const isTrackInPlaylist = state.playlist.some((t) => t.id === track.id)
    return {
      playlist: isTrackInPlaylist
      ? state.playlist.filter((t) => t.id !== track.id)
      : [...state.playlist, track]
    }
  }),
  toggleRandom() {
      set((state) => ({ isRandom: !state.isRandom }))
  },
  addTracksAndRemove: (tracks) => set((state) => ({ playlist: [...tracks] })),
}));

export default usePlayerStore;