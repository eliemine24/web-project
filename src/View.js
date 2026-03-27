
import './View.css';
import { useState, useEffect } from 'react';
import {RetourUtilisateur, Recommandations} from './Recos.js';
import { addMusic, getGenreIdByName, joue, uploadGenres} from './Model.tsx';
import { PageInitiale } from './PageInitiale.jsx';
import { PagePrincipale } from './PagePrincipale.jsx';
import { PageResultat } from './PageResultat.jsx';

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

  function passerALaSuivante(estUnLike, track, url) {
    if (!track) return;
    joue.set(track.trackId.toString(), { id: track.trackId.toString() });
    setTrack(null);
    const genreId = getGenreIdByName(track.primaryGenreName);
    if (estUnLike) {
      setLikes(likes + 1);
      addMusic(track.trackId, {nom : track.trackName,
                               nomArtiste : track.artistName, 
                               url : track});
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
            handleAction={(like, track) => passerALaSuivante(like, track, currentUrl)}
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
            getParam={getParam}
          />
        )}
      </header>
    </div>
  );
}

export default View;
