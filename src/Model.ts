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
 * @param genresCsv le fichier qui contient la liste des genres de musique
 */
export function uploadGenres(genresCsv: string){
  const rows = genresCsv.trim().split("\n");
  let i =1;
  for(; i < rows.length; i++){
    const [path, nom, code] = rows[i].split(",");
    listeGenres.set(code.trim(), {nom: nom.trim(),score: 0});
  };
  listeGenres.forEach((genre)=>{
    console.log(genre);
  });
}

/**
 * 
 * @param artiste un objet artiste
 * @param id un identifiant pour l'artiste
 */
export function addArtist(id : string, artiste : Artiste){
  listeArtistes.set(id, {nom : artiste.nom,score : artiste.score});
}

/**
 * 
 * @param genreId un identifiant pour le genre
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
 * @param artisteId un identifiant pour l'artiste
 * @param value, si la valeur est négative, le score diminue par 1, sinon il augmente par 1
 */
export function updateArtistScore(artisteId : string, value : number, nomArtiste : string){
  const artiste = listeArtistes.get(artisteId);
  if(!artiste){
    let score = value<0? -1:1;
    addArtist(artisteId, {nom: nomArtiste,score : score});
    return;
  }
  let nouveauScore = artiste.score;
  nouveauScore += value<0? -1:1;
  artiste.score = nouveauScore;
  listeArtistes.set(artisteId, artiste);
}


export const listeArtistes = new Map<string, Artiste>();
export const listeGenres = new Map<string, Genre>();