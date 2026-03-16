
import './App.css';
import React, { useState } from 'react';

function App() {
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
  return(
    <div className="Container">
      <div className="Compteur">{count} titres</div>
      <h1>discover</h1>
      <div className="Music-Card">
        <div className="Music-Info">
          <h2>Song Title</h2>
          <p>Artist Name</p>
        </div>
      </div>
      <MyButton couleur="#ff4458" symbole="❤︎" bottom="14%" right="15%" onClick={handleCount}/>  
      <MyButton couleur="#24292e" symbole="✗" bottom="14%" left="15%"/> 
      {count > 0 && (<ButtonTerm onClick={onFinish}/>)}
    </div>
    )

}

function PageResultat({count, onRestart}){
  return(
    <div className='Container'>
    </div>
  )

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
export default App;
