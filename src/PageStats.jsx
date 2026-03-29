import './View.css';
import { MyButton } from './MyButton.jsx';
import {listeArtistes,listeGenres} from './Model.tsx'

export function PageStats({onFinish}){
  /* On commence par trier les listes  */
  const topArtists = [...listeArtistes.entries()].sort((a, b) => b[1].score - a[1].score).slice(0,3);

  const topGenres = [...listeGenres.entries()].sort((a,b) => b[1].score - a[1].score).slice(0,3); 

  return(
    <div className="Container" color='#ffffff'>
        <MyButton couleur="#24292e" symbole=" ←" top = "8%" left="5%" onClick={onFinish}/>
        <h2><br></br>Top 3</h2>
        <div className="Playlist-Scroll">
        <h1>Artistes</h1>
        {topArtists.map(([id, artiste], index) => (
          <div key={id}>
            {index + 1} : {artiste.nom}
          </div>
        ))}
        </div>
        <div className='Playlist-scroll'>
        <h1>Genres</h1>
        {topGenres.map(([id, genre], index) => (
          <div key={id}>
            {index + 1} : {genre.nom}
          </div>
        ))}
      </div>
    </div>
    )

}
