import { uploadGenres, listeGenres, updateGenreScore, addArtist, listeArtistes, updateArtistScore, playlist, addMusic } from './Model';
import fs from "fs";
import path from "path";

describe('uploadGenres with African Music data', () => {
  beforeEach(() => {
    listeGenres.clear();
  });

  it('should correctly map African Dancehall using its code', async () => {
    const csvPath = path.resolve(__dirname, "./listeGenresItunes.csv");
    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const file = new File([csvContent], "listeGenresItunes.csv", {
      type: "text/csv",
    });

    await uploadGenres(file);

    expect(listeGenres.has("45")).toBe(true);
    expect(listeGenres.get("45").nom).toBe("African Dancehall");
    expect(listeGenres.get("45").score).toBe(0);
  });
});

describe('update the score of a genre', () => {
    beforeEach(() => {
      listeGenres.clear();
    });

    it('should currently update the score of an artist by 1', async() =>{
      const csvPath = path.resolve(__dirname, "./listeGenresItunes.csv");
      const csvContent = fs.readFileSync(csvPath, "utf-8");
      const file = new File([csvContent], "listeGenresItunes.csv", {
        type: "text/csv",
      });

      await uploadGenres(file);
      const initialScore = 0;
      updateGenreScore("1279", 42);

      expect(listeGenres.get("1279").score).toBe(initialScore + 1);
    });
});

describe('add an artist to the database',() => {
  beforeEach(() => {
    listeArtistes.clear();
  });

  it('should add an artist called Mary to the databased', async() =>{
    addArtist("530", {nom : "Mary", score : 5})

    expect(listeArtistes.has("530")).toBe(true);
    expect(listeArtistes.get("530").nom).toBe("Mary");
    expect(listeArtistes.get("530").score).toBe(5);
  });

});

describe('update the score of an artist in the database',() => {
  beforeEach(() => {
    listeArtistes.clear();
  });

  it('should currently update the score of an artist by 1', async() =>{
    const initialScore = 5;
    addArtist("530", {nom : "Mary", score : initialScore})
    updateArtistScore("530", 45, "Mary");
    expect(listeArtistes.get("530").score).toBe(initialScore + 1);
  });
});

describe('attempt to update an artist score for a non-existent artist and add them to the database', () => {
  beforeEach(() => {
    listeArtistes.clear();
  });

  it('should add an artist to the database that wasn\'t previously there', async() =>{
    updateArtistScore("87", 45, "John");
    expect(listeArtistes.has("87")).toBe(true);
    expect(listeArtistes.get("87").nom).toBe("John");
    expect(listeArtistes.get("87").score).toBe(1);
  });
});

describe('add music to the playlist', ()=> {
  beforeEach(() => {
    playlist.clear();
  });

  it('should add a song and its artist to the playlist', async() =>{
    addMusic("98", {nom: "Viva la Vida", nomArtiste : "Coldplay"});
    expect(playlist.has("98")).toBe(true);
    expect(playlist.get("98").nom).toBe("Viva la Vida");
    expect(playlist.get("98").nomArtiste).toBe("Coldplay");
  });
});
