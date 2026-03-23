
import './View.css';
import React, { useState, useEffect } from 'react';
import Recommandations from './Recos.js';
import {RetourUtilisateur} from './Recos.js';
import { addMusic, getGenreIdByName, joue } from './Model.tsx';
import { uploadGenres } from './Model.tsx';

function View() {
  const [screen, setScreen] = useState('init');
  const [likes, setLikes] = useState(0);
  const [urlsPool, setUrlsPool] = useState([]); // Stocke les 7 URLs
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paquetIndex, setPaquetIndex] = useState(1);
  const [track, setTrack] = useState(null);

  async function chargerNouveauPaquet(a) {
    const nouvellesUrls = await Recommandations(a);
    setUrlsPool(nouvellesUrls);
    setCurrentIndex(0); // On repart au début du nouveau paquet
  }

  useEffect(() => {
    uploadGenres();
    chargerNouveauPaquet(0);
  }, []);

  const currentUrl = urlsPool[currentIndex];

  function passerALaSuivante(estUnLike, track) {
    if (!track) return;
    joue.set(track.trackId.toString(), { id: track.trackId.toString() });
    setTrack(null);
    const genreId = getGenreIdByName(track.primaryGenreName);
    if (estUnLike) {
      setLikes(likes + 1);
      addMusic(track.trackId, {nom : track.trackName,
                               nomArtiste : track.artistName});
      RetourUtilisateur(true, track.artistName, track.artistId, genreId)
    }
    if(!estUnLike){
      RetourUtilisateur(false, track.artistName, track.artistId, genreId)
    }
    if (currentIndex < 6) {
      setCurrentIndex(currentIndex + 1);
    } else {
      chargerNouveauPaquet(paquetIndex);
      setPaquetIndex(prev => prev + 1);

    }
  }

  if (!currentUrl) return <div>Chargement du nouveau mix...</div>;


  function onFinish(){
    setScreen('playlist');
  }

  function onStart(){
    setScreen('discover');
  }

  function onRestart(){
    setLikes(0);
    setCurrentIndex(0);
    setScreen("discover");
    chargerNouveauPaquet();
  }

  return (
    <div className="App">
      <header className="App-header">

        {screen === 'init' && (
          <PageInitiale
            onStart={onStart}
          />
        )}

        {screen === 'discover' && (
          <PagePrincipale 
            count={likes} 
            handleAction={(like, track) => passerALaSuivante(like, track)}
            onFinish={() => setScreen('playlist')}
            url={currentUrl}
            track={track}        
            setTrack={setTrack}
          />
        )}

        {screen === 'playlist' && (
          <PageResultat
            count={likes}
            onRestart={onRestart}
          />
        )}
      </header>
    </div>
  );
}

function PageInitiale({onStart}){
  return(
    <div className="Container">
    <ButtonStart onClick={onStart}/>
    </div>
    )

}

function PagePrincipale({count, handleAction, onFinish, url, track, setTrack}){
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  async function GetSong(){
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
      let compteur = 0;
      let morceau = data.results[compteur];

      // On cherche dans les résultats un morceau qui n'a pas encore été "joué"
      while (compteur < data.results.length && joue.has(data.results[compteur].trackId.toString())) {
        compteur++;
      }

      // Si on a épuisé les 50 résultats sans en trouver un nouveau, on prend le 1er par défaut
      morceau = data.results[compteur] || data.results[0];
        setTrack(morceau);
        compteur = 1; 
      
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
      <div className="Compteur">{count} titres</div>
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
        </div>
        </>)}
      </div>
      <MyButton couleur="#ff4458" symbole="❤︎" bottom="13%" right="8%" onClick={() => track && handleAction(true, track)}/>  
      <MyButton couleur="#24292e" symbole="✗" bottom="13%" left="8%" onClick={() => track && handleAction(false, track)}/> 
      {count > 0 && (<ButtonTerm onClick={onFinish}/>)}
    </div>
    )

}

function PageResultat({ count, onRestart }) {
  return(
  <div className='Container'>
  </div>)
}


function MyButton({couleur, symbole, bottom, right, left, onClick}) {
  return (
    <button 
      className="Mon-bouton" 
      onClick={onClick}
      style={{ 
        backgroundColor: couleur,  
        bottom: bottom, 
        right: right,
        left: left 
      }}
    >
      {symbole}
    </button>
  );
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

function ButtonStart({onClick}){
  return(
    <button 
      className="Bouton-Start"
      style={{bottom: '50%'}} 
      onClick={onClick}
    >
      START!
    </button>)
}
export default View;
