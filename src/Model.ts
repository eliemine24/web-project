/*
Registers objects structures for 

- artists listes
- genres listes 
- etc
*/

/**
 * 
 */
interface Artiste {
  nom: string;
  score: number;
}

/**
 * 
 */
interface Genre {
  nom: string;
  score : number;
}

/**
 * 
 * @param genresCsv 
 */
export function uploadGenres(genresCsv: string){
  const rows = genresCsv.trim().split("\n");
  rows.forEach((row) => {
    const [path, nom, code] = row.split(",");
    listeGenres.set(code.trim(), {nom: nom.trim(),score: 0});
  });
  listeGenres.forEach((genre)=>{
    console.log(genre);
  });
}

/**
 * 
 * @param artiste 
 * @param id 
 */
export function addArtist(artiste : Artiste, id : string){
  listeArtistes.set(id, {nom : artiste.nom,score : artiste.score});
}

/**
 * 
 * @param genreId 
 * @param value, si la valeur est négative, le score diminue par 1, sinon il augmente par 1
 */
export function updateGenreScore(genreId : string, value : number){
  const genre = listeGenres.get(genreId);
  if(!genre){
    console.log(`genre avec id "${genreId}" n'existe pas`);
    return;
  }
  let nouveauScore = genre.score;
  nouveauScore += value<0? -1:1;
  genre.score = nouveauScore;
  listeGenres.set(genreId, genre);
}

/**
 * 
 * @param genreId 
 * @param value, si la valeur est négative, le score diminue par 1, sinon il augmente par 1
 */
export function updateArtistScore(artisteId : string, value : number, nomArtiste : string){
  const artiste = listeArtistes.get(artisteId);
  if(!artiste){
    let score = value<0? -1:1;
    addArtist({nom: nomArtiste,score : score}, artisteId);
    return;
  }
  let nouveauScore = artiste.score;
  nouveauScore += value<0? -1:1;
  artiste.score = nouveauScore;
  listeArtistes.set(artisteId, artiste);
}


export const listeArtistes = new Map<string, Artiste>();
export const listeGenres = new Map<string, Genre>();