/*

Algo de recommandation 

*/

import {listeArtistes, listeGenres, updateArtistScore, updateGenreScore} from "./Model.tsx";


export async function Recommandations(number){
    /* demande 7 nouvelles reco via les autres fonctions*/
    /* une fois les reco obtenues, applique le request maker dessus pour avoir les liens*/ 
    var recos = [];
    var url_recos = [];

    if (number === 0){
        for (var i = 0; i < 9; i = i + 1)
        {
        recos.push(await RecoAleatoire());
        } 
        for (const reco of recos){
            url_recos.push(await requestMaker(reco.index, reco.nom));
        }
    return url_recos;

    }
    if (number%2 === 0){
        recos.push(await RecoGenre(true, "haut"));
        recos.push(await RecoArtiste("faible"));
    }
    else {
         recos.push(await RecoGenre(true, "faible"));
         recos.push(await RecoArtiste("haut"));

    }
    recos.push(await RecoGenre(true, "normal")); 
    recos.push(await RecoGenre(false));
    recos.push(await RecoArtiste("normal"))
    for (var i = 0; i < 2; i = i + 1)
    {
        recos.push(await RecoAleatoire());
    } 
    for (const reco of recos){
        url_recos.push(await requestMaker(reco.index, reco.nom));
    }
    console.log(url_recos);
    return url_recos;
} 

/*
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
}*/


    

async function RecoGenre(like, niveau) {
    const tousLesGenres = Array.from(listeGenres.entries());
    
    if (tousLesGenres.length === 0) return await RecoAleatoire();

    let selection = [];

    if (like === true) {
        const genresPositifs = tousLesGenres.filter(([id, data]) => data.score > 0);
        
        if (genresPositifs.length === 0) {selection = tousLesGenres};

        if (niveau === "haut") {
            const maxScore = Math.max(...genresPositifs.map(([id, data]) => data.score));
            selection = genresPositifs.filter(([id, data]) => data.score === maxScore);
        } 
        else if (niveau === "faible") {
            const minScorePositif = Math.min(...genresPositifs.map(([id, data]) => data.score));
            selection = genresPositifs.filter(([id, data]) => data.score === minScorePositif);
        } 
        else {
            selection = genresPositifs;
        }
    } 
    else {
        selection = tousLesGenres.filter(([id, data]) => data.score <= 0);
    }

    if (selection.length === 0) selection = tousLesGenres;

    const randomIdx = Math.floor(Math.random() * selection.length);
    const [selectedId, selectedData] = selection[randomIdx];

    return {
        nom: selectedData.nom,
        index: selectedId
    };
}

async function RecoArtiste(niveau) {
    const artistesValides = Array.from(listeArtistes.entries())
                                 .filter(([id, data]) => data.score >= 0);

    if (artistesValides.length === 0) {return await RecoAleatoire()};
    let selection = [];
    if (niveau === "haut") {
        const maxScore = Math.max(...artistesValides.map(([id, data]) => data.score));
        selection = artistesValides.filter(([id, data]) => data.score === maxScore);
    } else if (niveau === "faible") {
        const minScore = Math.min(...artistesValides.map(([id, data]) => data.score));
        selection = artistesValides.filter(([id, data]) => data.score === minScore);
    } else {
        selection = artistesValides;
    }
    if (selection.length === 0) return await RecoAleatoire();

    const randomIdx = Math.floor(Math.random() * selection.length);
    const [selectedId, selectedData] = selection[randomIdx];
    console.log(selectedId, selectedData);

    return { nom: selectedData.nom, index : selectedId }; 
}


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

export function RetourUtilisateur(like, nomArtiste, artistId, genreId){
    /* modifie les objets mapArtistes et mapGenres pour changer le score du genre et celui de 
    l'artiste en fonction de si l'utilisateur a liké ou pas */
    if (like === true){
        /* on met +1 pour l'artiste et le genre */
        updateGenreScore(genreId, 1);
        updateArtistScore(artistId, 1, nomArtiste);
    }
    else{
        /* on met -1 pour l'artiste et le genre */
        updateGenreScore(genreId, -1);
        updateArtistScore(artistId, -1, nomArtiste);
    }

}