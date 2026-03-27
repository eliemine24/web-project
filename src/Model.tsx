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
  nomArtiste : string,
  url : string
}

interface Track {
  id : string
}

/**
 * 
 * @param genresCsv le fichier qui contient la liste des genres de musique
 */
export async function uploadGenres(){
  try {
    const response = await fetch('/listeGenresItunes.csv');
    const content = await response.text();

    const rows = content.trim().split(/\r?\n/);
    
    // On commence à 1 pour sauter l'en-tête du CSV
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(",");
      if (columns.length >= 4) {
        const [path, nom, code, id] = columns;
        // On remplit la Map globale
        listeGenres.set(id.trim(), { 
          nom: nom.trim(), 
          score: 0 
        });
      }
    }
    console.log(`${listeGenres.size} genres chargés depuis le CSV.`);
  } catch (error) {
    console.error("Erreur lors du chargement du CSV :", error);
  }
}

/**
 * 
 * @param artiste un objet artiste
 * @param id un identifiant pour l'artiste
 */
export function addArtist(id : string, artiste : Artiste){
  listeArtistes.set(id, {nom : artiste.nom,score : artiste.score});
}

export function addgenre(id : string, genre : Genre){
  listeGenres.set(id, {nom : genre.nom, score : genre.score});
}

/**
 * 
 * @param id 
 * @param musique 
 */
export function addMusic(id : string, musique : Musique){
  playlist.set(id, {nom : musique.nom, nomArtiste : musique.nomArtiste, url : musique.url});
}

/**
 * 
 * @param genreId un identifiant pour le genre
 * @param value, si la valeur est négative, le score diminue par 1, sinon il augmente par 1
 */
export function updateGenreScore(genreId : string, value : number, fallbackName: string = "Inconnu"){
  console.log(listeGenres);
  const increment = value < 0 ? -1 : 1;

  const id = genreId || fallbackName;
  const genre = listeGenres.get(id);

  if (!genre) {
    listeGenres.set(genreId, { nom: fallbackName, score: increment });
    return;
  }

  const nouveauScore = genre.score + increment;
  
  listeGenres.set(genreId, { 
    nom: genre.nom, 
    score: nouveauScore 
  });
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

export function getGenreIdByName(name: string): string | undefined {
  for (const [id, data] of listeGenres.entries()) {
    if (data.nom.toLowerCase() === name.toLowerCase()) {
      return id;
    }
  }
  return undefined;
}

export const listeArtistes = new Map<string, Artiste>();
export const listeGenres = new Map<string, Genre>();
export const playlist = new Map<string, Musique>();
export const joue = new Map<string, Track>();
