
import './View.css';
import React, { useState, useEffect } from 'react';


function View() {
  const [count, setCount] = useState(0);
  const [screen, setScreen] = useState('discover');
  function handleCount(){
    setCount(count + 1);
  }
  function onFinish(){
    setScreen('playlist');
  }
  function onRestart(){
    setCount(0);
    setScreen("discover");
  }

  return (
    <div className="App">
      <header className="App-header">
        {screen === 'discover' && (
          <PagePrincipale 
            count={count} 
            handleCount={handleCount}
            onFinish={onFinish}
          />
        )}

        {screen === 'playlist' && (
          <PageResultat
            count={count}
            onRestart={onRestart}
          />
        )}
      </header>
    </div>
  );
}

function PagePrincipale({count, handleCount, onFinish}){
  const [track, setTrack] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  async function GetSong(){
    try {
      const response = await fetch('https://itunes.apple.com/search?term=pop&genreId=14&limit=50&entity=song');
      const data = await response.json();
      if (data.results && data.results[39]) {
        const morceau = data.results[39];
        setTrack(morceau);
        audio.src = morceau.previewUrl;
        audio.play().catch(e => console.log("Audio en attente..."));
        setIsPlaying(true);}}
    catch(error){
      console.error("Erreur lors du fetch :", error);}
  }


  return(
    <div className="Container">
      <div className="Compteur">{count} titres</div>
      <h1>discover</h1>
      <div className="Music-Card">
        {!isPlaying ? (<ButtonStart onClick={GetSong}/>):(<>
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
      <MyButton couleur="#ff4458" symbole="❤︎" bottom="17%" right="8%" onClick={handleCount}/>  
      <MyButton couleur="#24292e" symbole="✗" bottom="17%" left="8%"/> 
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
