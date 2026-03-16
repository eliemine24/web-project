
import './App.css';
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  function handleCount(){
    setCount(count + 1);
}
  
  return (
    <div className="App">
      <header className="App-header">
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
          {count > 0 && (<ButtonTerm/>)}
          
        </div>
      </header>
    </div>
  );
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

function ButtonTerm(){
  return(
    <button 
      className="Bouton-Terminer"
      style={{bottom: '3%'}} 
    >
      DONE !
    </button>)
}
export default App;
