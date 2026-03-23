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
 */
interface Musique {
  nom : string,
  nomArtiste : string
}

/**
 * 
 * @param genresCsv le fichier qui contient la liste des genres de musique
 */
export async function uploadGenres(genresCsv: File){
  const content = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(genresCsv);
  });

  const rows = content.trim().split(/\r?\n/);
  let i =1;
  for(; i < rows.length; i++){
    const [path, nom, code, id] = rows[i].split(",");
    listeGenres.set(id.trim(), {nom: nom.trim(),score: 0});
  };
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
 * @param id 
 * @param musique 
 */
export function addMusic(id : string, musique : Musique){
  playlist.set(id, {nom : musique.nom, nomArtiste : musique.nomArtiste});
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
  listeGenres.set(genreId, {nom : genre.nom, score : nouveauScore});
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
export const playlist = new Map<string, Musique>();
