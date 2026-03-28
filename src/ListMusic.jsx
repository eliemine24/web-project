import {playlist} from './Model.tsx';
import './View.css';

export function ListMusic({playMusique}) {
  const musiquesArray = Array.from(playlist.values());
  return (
    <div className="Playlist-Tracklist">
      {musiquesArray.map((musique, index) => (
        <TrackRow 
          key={index} 
          index={index + 1} // Pour afficher 1, 2, 3...
          nom={musique.nom} 
          artiste={musique.nomArtiste} 
          playMusique = {playMusique}
        />
      ))}
    </div>
  );
}

function TrackRow({ index, nom, artiste, playMusique }) {
  return (
    <div className="Track-Row" onClick={() => playMusique(index-1)}>

      <span className="Track-Number">{index}</span>
      
      <div className="Track-Info">
        <span className="Track-Title">{nom}</span>
        <span className="Track-Artist">{artiste}</span>
      </div>
      
    </div>
  );
}
