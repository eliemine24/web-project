import {playlist} from './Model.tsx';
import './View.css';

function ListMusic(onClick) {
  return (
    playlist.forEach((musique) => {
      <ButtonMusic nom = {musique.nom} artiste={musique.nomArtiste} idMusic={musique.key} onClick = {onClick}/>
      })
  )
}

function ButtonMusic({nom, artiste, idMusic, onClick}){
  return(
    <button
      className="Bouton-Musique"
      onClick={onClick(idMusic)}
      >
        <b>{nom}</b>, {artiste}
      </button>
  )
}

export default ListMusic;