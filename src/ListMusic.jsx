import {playlist} from './Model.tsx';
import './View.css';

function ListMusic() {
  return (
    playlist.forEach((musique) => {
      <ButtonMusic nom = {musique.nom} artiste={musique.nomArtiste} idMusic=""/>
      })
  )
}

function ButtonMusic({nom, artiste, infoMusic, onClick}){
  return(
    <button
      className="Bouton-Musique"
      onClick={onClick}
      >
        <b>{nom}</b>, {artiste}
      </button>
  )
}

export default ListMusic;