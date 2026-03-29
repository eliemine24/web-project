import './View.css';
import { MyButton } from './MyButton.jsx';
import { getThreeMostPopular } from './Model.tsx';

export function PageStats({onFinish}){
  const topArtists = getThreeMostPopular('nomArtiste');
  const topGenres = getThreeMostPopular('genre');

  return(
    <div className="Container" color='#ffffff'>
        <MyButton couleur="#24292e" symbole=" ←" top = "8%" left="5%" onClick={onFinish}/>
        <h2><br></br>Top 3</h2>
        <div>
        <h1>Artistes</h1>
          {topArtists.length > 0 ? (
            topArtists.map((nom, index) => (
              <div key={nom}>
                {index + 1} : {nom}
              </div>
            ))) : (
          <p>Pas encore d'artistes</p>
        )}
        </div>
        <div>
        <h1>Genres</h1>
        {topGenres.length > 0 ? (
          topGenres.map((nom, index) => (
            <div key={nom}>
              {index + 1} : {nom}
            </div>
          ))
        ) : (
          <p>Pas encore de genres</p>
        )}
      </div>
    </div>
    )

}
