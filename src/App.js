
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <h1>discover</h1>
          <MyButton couleur="tomato" symbole="❤︎" top="400px" right= "20px"/>  
          <MyButton couleur="blue" symbole="✗" top="400px" right= "220px"/>  
        </div>
      </header>
    </div>
  );
}


function MyButton({couleur, symbole, top, right}) {
  return (
    <button className="Mon-bouton" style={{ backgroundColor: couleur,  top: top, right: right }}>
      {symbole}
    </button>
  );
}
export default App;
