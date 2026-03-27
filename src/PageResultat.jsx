import { useState } from 'react';
import { MyButton } from './MyButton.jsx';
import { ListMusic } from './ListMusic.jsx';


export function PageResultat({ count, onRestart, onStats }) {
  const [track, setTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

async function GetSong(){
    try {
      const url = 'https://itunes.apple.com/search?term=pop&genreId=14&limit=50&entity=song';
      const response = await fetch(url);
      const data = await response.json();
      const entier = Math.floor(Math.random() * (20 + 1));
      if (data.results && data.results[entier]) {
        const morceau = data.results[entier];
        setTrack(morceau);
        audio.pause();
        audio.src = morceau.previewUrl;
        audio.load();
        audio.play().catch(e => console.log("Audio en attente..."));
        setIsPlaying(true);}}
    catch(error){
      console.error("Erreur lors du fetch :", error);}
  }
  
  function playMusicId(musicId){
  }
  
  return(
    <div className="Container">
      <h1>playlist</h1>
      {count > 0 && (<MyButton couleur="#24292e" symbole="⚙️" top = "8%"  right="5%" onClick={onStats}/>)}
      {count > 0 && (<MyButton couleur="#24292e" symbole="⟳" top = "8%" left="5%" onClick={onRestart}/>)}
      <div className="Music-Card">
        {track && (
        <>
        <img 
          src={track.artworkUrl100.replace('100x100', '400x400')} 
          alt="cover" 
          style={{ borderRadius: '15px', width: '100%' }} 
        />
        <div className="Music-Info">
          <h2>{track.trackName}</h2>
          <p>{track.artistName}</p>
        </div></>)}
      </div>
      <MyButton couleur="#24292e" symbole="⏭" top= "34%" right="12%"/>  
      <MyButton couleur="#24292e" symbole="⏸" top="34%" left="12%"/> 
      <div className="Playlist-Scroll">
        <ListMusic onClick = {playMusicId()}/>
      </div>
    </div>
    )
}