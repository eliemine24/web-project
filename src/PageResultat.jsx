import { useState, useEffect } from 'react';
import { MyButton } from './MyButton.jsx';
import { ListMusic } from './ListMusic.jsx';
import { playlist } from './Model.tsx';


export function PageResultat({ count, onRestart, getParam }) {
  const [track, setTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const musiquesArray = Array.from(playlist.values());


function playAtIndex(index) {
    if (index >= 0 && index < musiquesArray.length) {
      const selectedTrack = musiquesArray[index];
      setCurrentIndex(index);
      
      setTrack(selectedTrack.url);
      audio.src = selectedTrack.url.previewUrl; 
      audio.load();
      audio.play().catch(e => console.warn("Lecture bloquée par le navigateur", e));
    }
  }

  // Passe au morceau suivant automatiquement
  useEffect(() => {
    const handleEnded = () => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < musiquesArray.length) {
        playAtIndex(nextIndex); // Joue la suivante
      } else {
        console.log("Fin de la playlist");
      }
    };
  }, [currentIndex]); // Se réactive quand l'index change


function pauseMusique(){
    audio.pause();
  }
  
  return(
    <div className="Container">
      <h1>playlist</h1>
      {count > 0 && (<MyButton couleur="#24292e" symbole="⚙️" top = "8%"  right="5%" onClick={getParam}/>)}
      {count > 0 && (<MyButton couleur="#24292e" symbole="⟳" top = "8%" left="5%" onClick={() => onRestart({audio})}/>)}
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
      <MyButton couleur="#24292e" symbole="⏭" top= "34%" right="12%" onClick={() => playAtIndex(currentIndex + 1)}/>  
      <MyButton couleur="#24292e" symbole="⏸" top="34%" left="12%" onClick={pauseMusique}/> 
      <div className="Playlist-Scroll">
        <ListMusic playMusique = {playAtIndex}/>
      </div>
    </div>
    )
}