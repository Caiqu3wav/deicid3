import { Beat } from "@/interfaces";
import Link from "next/link";
import usePlayerStore from "@/app/store/playerStore";
import { Pause, Play } from "@/app/icons";
import { MdPlaylistAddCircle } from "react-icons/md";
import { CgPlayListRemove } from "react-icons/cg";
import { beats } from "@/app/api/beats/";
import "./musics.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';


type Props = {
    beat: Beat
}

export const BeatsCard = ({ beat }: Props) => {
    const {
        playTrack,
        togglePlay,
        currentTrack,
        isPlaying,
        togglePlaylist, 
        playlist,
        addTracks,
        addTracksAndRemove
    } = usePlayerStore((state) => ({
        playTrack: state.playTrack,
        togglePlay: state.togglePlay,
        currentTrack: state.currentTrack,
        isPlaying: state.isPlaying,
        playlist: state.playlist,
        togglePlaylist: state.togglePlaylist,
        addTracks: state.addTracks,
        addTracksAndRemove: state.addTracksAndRemove
    }));

    const isCurrentTrackPlaying = currentTrack?.id === beat.id && isPlaying;
    const isTrackInPlaylist = playlist.some((t) => t.id === beat.id);

    const handlePlayTrack = (beat: Beat) => {
        if (currentTrack?.id === beat.id) {
            togglePlay();
            return;
        }
        playTrack(beat);
        addTracksAndRemove(beats);
    }

    return (
        <div className="flex flex-col items-center justify-center">
                    <Card className=" majorfour:w-[180px] majorfour1:w-[240px] midtwo:w-[190px] midfour:w-[150px]" sx={{ maxWidth: 345, color: "#fff", border: "2px solid transparent",
  borderRadius: "12px",
  background: "linear-gradient(#1e1e1e, #1e1e1e) padding-box, linear-gradient(45deg, #020202, #ff0000) border-box",
  boxShadow: "0px 0px 10px rgba(225, 225, 225, 0.5), 0px 0px 10px rgba(0, 255, 255, 0.5)" }}>
                <CardActionArea onClick={() => handlePlayTrack(beat)}>
                    <CardMedia
                    component="img"
                    image={beat.album_img}
                    alt={beat.name} className="midtwo:w-[100%] h-[250px] majorfour:h-[180px] majorfour1:h-[240px] midtwo:h-[190px] midfour:h-[150px]"
                    sx={{ width: 250, maxHeight: 250, margin: "auto", objectFit: "cover" }}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: "#ddd", textAlign: "center" }}>
                        {beat.name.charAt(0).toUpperCase() + beat.name.slice(1)}
                    </Typography>
                    <audio src={beat.audio} />
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Button onClick={() => (isCurrentTrackPlaying ? togglePlay() : handlePlayTrack(beat))} color="error">
                    {isCurrentTrackPlaying ? <Pause size={40} /> : <Play size={40} />}
                    </Button>
                    <Button onClick={() => togglePlaylist(beat)} color="inherit">
                    {isTrackInPlaylist ? <CgPlayListRemove size={40} /> : <MdPlaylistAddCircle size={40} />}
                    </Button>
                </CardActions>
                <CardActionArea href="/buybeat">
                    <button className="self-center w-full text-white h-full px-2 mt-4 py-2 
                        transition-all duration-700 hover:bg-black hover:text-red-600">$BUY/INFO</button>
                </CardActionArea>
                </Card>
        </div>
    )

}