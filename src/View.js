
import './View.css';
import React, { useState, useEffect } from 'react';
import {RetourUtilisateur, Recommandations} from './Recos.js';
import { addMusic, getGenreIdByName, joue, playlist, uploadGenres} from './Model.tsx';
import ListMusic from './ListMusic.jsx';

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
  
  function getParam(){
    setScreen("parameter")
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

function PagePrincipale({count, handleAction, onFinish, url}){
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
          <p class="genre">{track.primaryGenreName}</p>
        </div>
        </>)}
      </div>
      <MyButton couleur="#ff4458" symbole="❤︎" top="75%" right="8%" onClick={() => track && handleAction(true, track)}/>  
      <MyButton couleur="#24292e" symbole="✗" top="75%" left="8%" onClick={() => track && handleAction(false, track)}/> 
      {count > 0 && (<ButtonTerm onClick={onFinish}/>)}
    </div>
    )

}

function PageResultat({ count, onRestart, getParam }) {
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
        <ListMusic onClick = {playMusicId()}/>
      </div>
    </div>
    )
}


function MyButton({couleur, symbole, top, right, left, onClick}) {
  return (
    <button 
      className="Mon-bouton" 
      onClick={onClick}
      style={{ 
        backgroundColor: couleur,  
        top: top, 
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
