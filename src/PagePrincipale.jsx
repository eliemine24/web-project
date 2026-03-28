import { useState, useEffect } from 'react';
import { MyButton } from './MyButton.jsx';
import { joue, playlist } from './Model.tsx';

export function PagePrincipale({count, handleAction, onFinish, url}){
  const [track, setTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  async function GetSong(){
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const resultatsMelanges = data.results.sort(() => Math.random() - 0.5);
        // Trouver le premier qui n'a pas été joué
        let morceau = resultatsMelanges.find(m => !joue.has(m.trackId.toString()));
        // Si tout a été joué, on prend le premier du mélange (le hasard parmi les déjà joués)
        if (!morceau) {
          morceau = resultatsMelanges[0];
        }

        setTrack(morceau);
        audio.pause();
        audio.src = morceau.previewUrl;
        audio.load();
        audio.play().catch(e => console.log("Audio en attente..."));
        setIsPlaying(true);}}
    catch(error){
      console.error("Erreur lors du fetch :", error);}
  }

  useEffect(() => {
      GetSong();
  }, [url]);


  return(
    <div className="Container">
      <div className="Compteur">{playlist.size} titres</div>
      <h1>discover</h1>
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
          <p className="genre">{track.primaryGenreName}</p>
        </div>
        </>)}
      </div>
      <MyButton couleur="#ff4458" symbole="❤︎" top="75%" right="8%" onClick={() => track && handleAction(true, track)}/>  
      <MyButton couleur="#24292e" symbole="✗" top="75%" left="8%" onClick={() => track && handleAction(false, track)}/> 
      {count > 0 && (<ButtonTerm onClick={onFinish}/>)}
    </div>
    )
}

function ButtonTerm({onClick}){
  return(
    <button 
      className="Bouton-Terminer"
      style={{bottom: '3%'}} 
      onClick={onClick}
    >
      DONE !
    </button>)
}