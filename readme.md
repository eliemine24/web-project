# WEB

## Projet : créer une web-app

Réaliser un **Générateur de playlists** à partir de plusieurs paramètres :

- Nombre de titres
- Genres musicaux
- Artistes

## Idées en vrac 

 Utiliser un **[API](https://www.theaudiodb.com/free_music_api)** pour trouver les titres/artistes/genres 
 
 Utiliser un **framework** react


## Main Concept

Web-app pour découvrir de la musique à partir de recommandations, basée sur des préférences. on obtient à la fin une liste de musique, susceptible d'être exportée en playlist sur des plateformes si on a le temps.


## Utilisation 

**Choix des paramètres de base**

L'utilisateur·ice choisi des paramètres/preférences initiales pour oprienter les recommandations, et ne pas partir sur de la recommandation complètement random.

- pays/langue
- genre (général, pas trop précis)
- durée ?
- artist like ?
- popularité ?

**Recommandations et choix**

L'appli recommande successivement des titres choisis aléatoirement (recherche à partir des paramètres de base sur API par exemple). Si on y arrive, play le titre recommandé. L'utilisateur·ice dit si le titre lui plait ou non. 

- si oui, le titre est enregistré dans une playlist, les stats du titre sont enregistrées pour affiner l'algorithme de recommandations (ça paraît très difficile mais azy). 
- si non, on exclut le genre/l'artiste des recoomandation ?. une fois le choix fait, on passe au titre suivant. 

**Suggestion de Victor**

Ne pas avoir de préférences de base et partir directement dans la recommandation aléatoire, puis affiner au fur et à mesure.