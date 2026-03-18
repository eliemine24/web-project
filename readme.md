# WEB Project - Discover 

## Main Concept

Web-app pour découvrir de la musique à partir de recommandations, basée sur des préférences. on obtient à la fin une liste de musique, susceptible d'être exportée en playlist sur des plateformes si on a le temps.


## Utilisation 

### Choix des paramètres de base (skip pour le moment)

L'utilisateur·ice choisi des paramètres/preférences initiales pour oprienter les recommandations, et ne pas partir sur de la recommandation complètement random.

- pays/langue
- genre (général, pas trop précis)
- durée ?
- artist like ?
- popularité ?

### Recommandations et choix

L'appli recommande successivement des titres choisis aléatoirement (recherche à partir des paramètres de base sur API par exemple). Si on y arrive, play le titre recommandé. L'utilisateur·ice dit si le titre lui plait ou non. 

- si oui, le titre est enregistré dans une playlist, les stats du titre sont enregistrées pour affiner l'algorithme de recommandations (ça paraît très difficile mais azy). 
- si non, on exclut le genre/l'artiste des recoomandation ?. une fois le choix fait, on passe au titre suivant. 

## Outils 

### [Spotify API](https://developer.spotify.com/documentation/web-api)

API le plus complet en terme de recommandations (genres, pays, nombre de titre, paramètres, etc) 

Nécessite des clefs d'accès (Élie a créé une app depuis son compte spotify). On récupère un jeton d'accès d'une heures permettant d'utiliser l'API 

**Accès API**

récupérer le jeton d'accès  (depuis un terminal):
```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=8ab63044b4b74d928a900e1d56e912e1&client_secret=ask-elie

réponse spotify api :
```bash
{
  "access_token": "jeton-daccès valable une heure à copier coller dans le back-end",
  "token_type": "Bearer",
  "expires_in": 3600
}
```


### [iTunes API](https://www.apple.com/itunes/)

API permettant d'avoir accès a des extraits de trente seconde librement ça a l'air super


## Architecture

### Modèle

- `repertoire-genres` (tableau, variable) : répertorie la liste des genres, leur id correspondant dans l'api, leur score de recommandation
- `repertoire-genres` (tableau, variable) : répertorie la liste des artistes et leur id correspondant dans l'api, leur score de recommandation
- `playlist` (tableau, variable) : enregistre les titres et artiste des musiques likée par l'utilisateur·ice

### View

- `recommandation` : cadre avec la recommandation de l'algo (image + extrait musical)
- `like` : enregistre la musique actuellement proposée dans la playlist, met à jour le modèle (scores de recommandation des artistes/genres), passe à la recommandation suivante
- `dislike` : met à jour les stats, passe à la recommandation suivante
- `done` : fin de la session, affiche la page de stats et la playlist

- `download playlist` : permet de télécharger un csv/json des musiques likées

### Controller

1. propose N musiques random pour commencer
2. au bout des N musiques random, à partir des statistiques, renvoie les 6 recommandations suivantes : 
  - 3 titres issus des genres appréciés
  - 1 titre issu des artistes appréciés
  - 2 titres aléatoires
3. à la fin des 6 reco, recommence tant que `done` n'est pas appuyé. 
