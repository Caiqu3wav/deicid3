import { Beat } from "@/interfaces";
import Link from "next/link";
import usePlayerStore from "@/app/store/playerStore";
import { Pause, Play } from "@/app/icons";
import { MdPlaylistAddCircle } from "react-icons/md";
import { CgPlayListRemove } from "react-icons/cg";
import { beats } from "@/app/api/beats";
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
        playTrack(beat);
        addTracksAndRemove(beats);
    }

    return (
        <div className="flex flex-col items-center justify-center">
                    <Card sx={{ maxWidth: 345, backgroundColor: "#1e1e1e", color: "#fff" }}>
                <CardActionArea onClick={() => handlePlayTrack(beat)}>
                    <CardMedia
                    component="img"
                    image={beat.album_img}
                    alt={beat.name}
                    sx={{ width: 250, height: 250, margin: "auto", objectFit: "cover" }}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: "#ddd", textAlign: "center" }}>
                        {beat.name.charAt(0).toUpperCase() + beat.name.slice(1)}
                    </Typography>
                    <audio src={beat.audio} />
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Button onClick={() => (isCurrentTrackPlaying ? togglePlay() : handlePlayTrack(beat))} color="primary">
                    {isCurrentTrackPlaying ? <Pause size={40} /> : <Play size={40} />}
                    </Button>
                    <Button onClick={() => togglePlaylist(beat)} color="secondary">
                    {isTrackInPlaylist ? <CgPlayListRemove size={40} /> : <MdPlaylistAddCircle size={40} />}
                    </Button>
                </CardActions>
                </Card>
            <Link href="/buybeat"><button className="self-center text-white bg-blue-500 w-fit px-2 mt-4 h-fit py-2 
                        rounded-2xl transition-all duration-700 hover:bg-black hover:text-blue-600">$BUY/INFO</button></Link>
        </div>
    )

}