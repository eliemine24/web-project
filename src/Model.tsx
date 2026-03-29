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
  url : any,
  genre : string
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
  playlist.set(id, {nom : musique.nom, nomArtiste : musique.nomArtiste, url : musique.url, genre : musique.genre});
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

export function getThreeMostPopular(type: 'genre' | 'artiste'): string[] {
  const counts = new Map<string, number>();

  // On parcourt la playlist pour compter les occurrences
  for (const musique of playlist.values()) {
    const valeur = type === 'genre' ? musique.genre : musique.nomArtiste;
    
    if (valeur) {
      counts.set(valeur, (counts.get(valeur) || 0) + 1);
    }
  }
  // On transforme la Map en tableau, on trie par nombre d'apparition et on prend les 3 premiers noms
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1]) // Tri décroissant sur le compteur (index 1)
    .slice(0, 3)
    .map(entry => entry[0]); // On retourne la clé (index 0)
}

export const listeArtistes = new Map<string, Artiste>();
export const listeGenres = new Map<string, Genre>();
export const playlist = new Map<string, Musique>();
export const joue = new Map<string, Track>();
