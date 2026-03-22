/*

Algo de recommandation 

*/

import mapArtistes from "./Model.js";

//import { listeArtistes, listeGenres } from "./Model.js";

/*export default function Recommandations(number){
    /* demande 7 nouvelles reco via les autres fonctions*/
    /* une fois les reco obtenues, applique le request maker dessus pour avoir les liens*/ 
    /*var recos = [];
    var url_recos = [];
    if (number%2 == 0){
        recos.push(RecoGenre(true, "haut"));
        recos.push(RecoArtiste("faible"));
    }
    else {
         recos.push(RecoGenre(true, "faible"));
         recos.push(RecoArtiste("haut"));

    }
    recos.push(RecoGenre(true, "normal")); 
    recos.push(RecoGenre(false));
    recos.push(RecoArtiste("normal"))
    for (var i = 0; i < 2; i = i + 1)
    {
        recos.push(RecoAleatoire());
    } 
    for (const reco of recos){
        url_recos.push(RequestMaker(reco));
    }
    return url_recos;
} */

export default async function Recommandations(number){
    var recos = [];
    var url_recos = [];
    for (var i = 0; i < number; i = i + 1)
    {
        recos.push(await RecoAleatoire());
    } 
    for (const reco of recos){
        url_recos.push(await requestMaker(reco.index, reco.nom));
    }
    return url_recos;
}


    

function RecoGenre(like, niveau){
    /* donne une reco en fonction de si on aime ou non le genre et de si on l'aime beaucoup 
    ou juste un peu */
    if (like === true){

    }
    else{

    }
}

function RecoArtiste(niveau) {
    // On transforme la Map en tableau et on filtre direct les scores < 0
    const artistesValides = Array.from(mapArtistes.entries())
                                 .filter(([nom, score]) => score >= 0);
    // Sécurité : si aucun artiste n'a un score >= 0
    if (artistesValides.length === 0) return null;
    let selection = [];
    if (niveau === "haut") {
        // On cherche le score maximum parmi les valides
        const maxScore = Math.max(...artistesValides.map(a => a[1]));
        // On garde tous ceux qui ont ce score max (au cas où il y ait des ex-aequo)
        selection = artistesValides.filter(a => a[1] === maxScore);
    } else if (niveau === "faible") {
        // On cherche le score minimum (mais >= 0)
        const minScore = Math.min(...artistesValides.map(a => a[1]));
        selection = artistesValides.filter(a => a[1] === minScore);
    } else {
        selection = artistesValides;
    }
    // On pioche au hasard dans la sélection finale
    const indexAleatoire = Math.floor(Math.random() * selection.length);
    // selection[index] est un tableau [nom, score], on retourne le nom (index 0)
    return selection[indexAleatoire][0];}


async function RecoAleatoire(){
    /* donne une reco aléatoire de genre*/
    const response = await fetch('/listeGenresItunes.csv');
    const data = await response.text();
    const lignes = data.split('\n').filter(ligne => ligne.trim() !== "");

    const poidsSpeciaux = {
        "Pop": 50,    
        "Rock": 40,
        "Heavy Metal": 10,
        "Alternative": 20,
        "Electro": 20
    };

    const genres = lignes.slice(1).map(ligne => {const colonnes = ligne.split(',');
        const nom = colonnes[1];
        const poids = poidsSpeciaux[nom] || 1;

        return {
            nom: colonnes[1],
            code: colonnes[3],
            poids: poids
        };
        });

    
    const sommePoids = genres.reduce((acc, g) => acc + g.poids, 0);

    let indexAleatoire = Math.random() * sommePoids;
    for (const item of genres) {
    if (indexAleatoire < item.poids) {
        return {
            nom: item.nom,
            index: item.code
        };
    }
    indexAleatoire -= item.poids;
}}
    


async function requestMaker(id = "", name = "") {
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
  genreId = id;
  /*
  if (id && typeof listeGenres !== 'undefined' && listeGenres.has(id)) {
    genreId = id;
  }*/

  term = name;
  // Si l'id correspond à un artiste, on peut utiliser spécialement son nom
  /*
  if (id && typeof listeArtistes !== 'undefined' && listeArtistes.has(id)) {
    const artiste = listeArtistes.get(id);
    if (artiste?.nom) {
      term = artiste.nom;
    }
  }*/

  const url = new URL("https://itunes.apple.com/search");
  url.searchParams.set("term", term);
  url.searchParams.set("entity", "song");
  url.searchParams.set("limit", "50");
  url.searchParams.set("genreId", genreId);

  return url.toString();
}

function RetourUtilisateur(like, artist, genre){
    /* modifie les objets mapArtistes et mapGenres pour changer le score du genre et celui de 
    l'artiste en fonction de si l'utilisateur a liké ou pas */
    if (like === true){
        /* on met +1 pour l'artiste et le genre */
    }
    else{
        /* on met -1 pour l'artiste et le genre */
    }

}