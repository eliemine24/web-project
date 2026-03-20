/* http iTunes api request maker from "id" and "name" arguments */

import { listeArtistes, listeGenres } from "./Model";

export async function requestMaker(id = "", name = "") {
  // Default query when on ne sait pas quoi chercher
  const defaultTerm = "pop";
  const defaultGenreId = "14";

  // term: on privilégie le nom fourni, sinon on retient "pop"
  let term = defaultTerm;
  if (name && name.trim().length > 0) {
    term = name.trim();
  }

  // genreId: par défaut 14 (pop). Si l'id correspond à un genre existant, on l'utilise.
  let genreId = defaultGenreId;
  if (id && listeGenres?.has && listeGenres.has(id)) {
    genreId = id;
  }

  // Si l'id correspond à un artiste, on peut utiliser spécialement son nom
  if (id && listeArtistes?.has && listeArtistes.has(id)) {
    const artiste = listeArtistes.get(id);
    if (artiste?.nom) {
      term = artiste.nom;
    }
  }

  const url = new URL("https://itunes.apple.com/search");
  url.searchParams.set("term", term);
  url.searchParams.set("entity", "song");
  url.searchParams.set("limit", "50");
  url.searchParams.set("genreId", genreId);

  return url.toString();
}
