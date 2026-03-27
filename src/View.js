
import './View.css';
import React, { useState, useEffect } from 'react';
import Recommandations from './Recos';
import { addMusic, playlist } from './Model.tsx';

function View() {
  const [screen, setScreen] = useState('init');
  const [likes, setLikes] = useState(0);
  const [urlsPool, setUrlsPool] = useState([]); // Stocke les 7 URLs
  const [currentIndex, setCurrentIndex] = useState(0)

  async function chargerNouveauPaquet() {
    const nouvellesUrls = await Recommandations(7);
    setUrlsPool(nouvellesUrls);
    setCurrentIndex(0); // On repart au début du nouveau paquet
  }

  useEffect(() => {
    chargerNouveauPaquet();
  }, []);

  const currentUrl = urlsPool[currentIndex];

  function passerALaSuivante(estUnLike, track) {
    if (estUnLike) {
      setLikes(likes + 1);
      addMusic(track.trackId, {nom : track.trackName,
                               nomArtiste : track.artistName});
      console.log(playlist);
        
    }

    if (currentIndex < 6) {
      setCurrentIndex(currentIndex + 1);
    } else {
      chargerNouveauPaquet();
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
 
    <div className="Container" color='#ffffff'>
        <div class="horizontal-scroll">
	        <div class="horizontal-scroll-item item-1"></div>
	        <div class="horizontal-scroll-item item-2"></div>
          <div class="horizontal-scroll-item item-3"></div>
          <div class="horizontal-scroll-item item-4"></div>
          <div class="horizontal-scroll-item item-5"></div>
          <div class="horizontal-scroll-item item-1"></div>
          <div class="horizontal-scroll-item item-2"></div>
          <div class="horizontal-scroll-item item-3"></div>
          <div class="horizontal-scroll-item item-4"></div>
          <div class="horizontal-scroll-item item-5"></div>		
        </div>
        <div class="Title">
          Munder
        </div>
        <div>
          <ButtonStart onClick={onStart}/>
        </div>
        <div class="horizontal-scroll-bis">
          <div class="horizontal-scroll-item-bis item-6"></div>
          <div class="horizontal-scroll-item-bis item-7"></div>
          <div class="horizontal-scroll-item-bis item-8"></div>
          <div class="horizontal-scroll-item-bis item-9"></div>
          <div class="horizontal-scroll-item-bis item-10"></div>	
          <div class="horizontal-scroll-item-bis item-6"></div>
          <div class="horizontal-scroll-item-bis item-7"></div>
          <div class="horizontal-scroll-item-bis item-8"></div>
          <div class="horizontal-scroll-item-bis item-9"></div>
          <div class="horizontal-scroll-item-bis item-10"></div>	
        </div>
    </div>
    )

}

function PagePrincipale({count, handleAction, onFinish, url}){
  const [track, setTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  async function GetSong(){
    try {
      console.log(url);
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
      <MyButton couleur="#ff4458" symbole="❤︎" bottom="14%" right="8%" onClick={() => handleAction(true, track)}/>  
      <MyButton couleur="#24292e" symbole="✗" bottom="14%" left="8%" onClick={() => handleAction(false)}/> 
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
