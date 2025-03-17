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
  playlistRemoveAll: () => void;
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
    volume: 0.5,
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
      const prevVolume = state.volume;

      if (!state.playlist.some((t) => t.id === track.id)) {
        return { playlist: [...state.playlist, track], currentTrack: track, isPlaying: true, volume: prevVolume };
      }
      return { currentTrack: track, isPlaying: true, volume: prevVolume };
    });
},
  playNextTrack: () => {
    const { playlist, currentTrack, isRandom } = get();
    if (!playlist.length) return;
    const prevVolume = get().volume;

    let nextTrack;
    if (isRandom) {
      nextTrack = playlist[Math.floor(Math.random() * playlist.length)];
    } else {
      const currentIndex = playlist.findIndex((track) => track.id === currentTrack?.id);
      nextTrack = playlist[(currentIndex + 1) % playlist.length];
    }
    set({ currentTrack: nextTrack, volume: prevVolume });
  },
  playPrevTrack: () => {
    const { playlist, currentTrack, volume } = get();
      if (!playlist.length) return;
      
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack?.id);
    const prevTrack = playlist[currentIndex -1] || playlist[0];
    
    set({ currentTrack: prevTrack, isPlaying: true, volume });
  },
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
  playlistRemoveAll: () => set((state) => ({playlist: []}))
}));

export default usePlayerStore;