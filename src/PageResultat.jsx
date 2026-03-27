import { useState, useEffect } from 'react';
import { MyButton } from './MyButton.jsx';
import { ListMusic } from './ListMusic.jsx';


export function PageResultat({ count, onRestart, getParam }) {
  const [track, setTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

async function GetSong(selectedTrack){
    if (!selectedTrack || !selectedTrack.previewUrl) {
      console.warn('Track invalide ou sans previewUrl', selectedTrack);
      return;
    }

    setTrack(selectedTrack);
    audio.pause();
    audio.src = selectedTrack.previewUrl;
    audio.load();

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn('Audio en attente...', error);
      setIsPlaying(false);
    }
  }
  
  return(
    <div className="Container">
      <h1>playlist</h1>
      {count > 0 && (<MyButton couleur="#24292e" symbole="⚙️" top = "8%"  right="5%" onClick={getParam}/>)}
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
        <ListMusic playMusique = {GetSong}/>
      </div>
    </div>
    )
}