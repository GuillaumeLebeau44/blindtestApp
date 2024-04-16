// Import des dépendances
require("dotenv").config();
const { database, tables } = require("./setup");

let createdSongIds = [];
// test de création d'une nouvelle musique
describe("Test suite SONG", () => {
  // Test de base
  it("should pass", () => {
    // Assertion
    expect(true).toBe(true);
  });

  it("should create a song successfully", async () => {
    // objet musique complet
    const newSongSample = {
      title: "Death by Glamour",
      link: "https://youtu.be/2TgO-tN5wAM?si=uGo6HUZXWQqhIMwF",
      embed:
        "https://www.youtube.com/embed/2TgO-tN5wAM?autoplay=1&si=B-ED1q_sAMPwpKma",
      game: "UNDERTALE",
    };

    // utilisation,
    const { title, link, embed, game } = newSongSample;
    const result = await tables.song.addSong(title, link, embed, game);
    const { insertId } = result;

    createdSongIds.push(insertId);

    // Check if the newly added item exists in the database
    const [rows] = await database.query(
      "select * from song where id = ?",
      insertId
    );

    const foundSong = rows[0];

    // Assertions
    expect(foundSong).toBeDefined();
    expect(foundSong.title).toBe(newSongSample.title);
    expect(foundSong.link).toBe(newSongSample.link);
    expect(foundSong.embed).toBe(`${newSongSample.embed}&autoplay=1`);
    expect(foundSong.game).toBe(newSongSample.game);
  });

  it("should throw when passing invalid object", async () => {
    // Send a create request to the item table with an empty object
    const promise = tables.song.addSong({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

// test de suppression d'une musique
describe("Delete song", () => {
  it("should delete a song successfully", async () => {
    // Création d'une nouvelle chanson à supprimer
    const newSongSample = {
      title: "Death by Glamour",
      link: "https://youtu.be/2TgO-tN5wAM?si=uGo6HUZXWQqhIMwF",
      embed:
        "https://www.youtube.com/embed/2TgO-tN5wAM?autoplay=1&si=B-ED1q_sAMPwpKma&autoplay=1",
      game: "UNDERTALE",
    };

    // Ajout de la chanson à la base de données
    const { title, link, embed, game } = newSongSample;
    const result = await tables.song.addSong(title, link, embed, game);
    const { insertId } = result;

    createdSongIds.push(insertId);

    // Suppression de la chanson en utilisant son ID
    await tables.song.removeById(insertId);

    // Vérification si la chanson a été supprimée en vérifiant si elle existe dans la base de données
    const [rows] = await database.query(
      "SELECT * FROM song WHERE id = ?",
      insertId
    );
    const foundSong = rows[0];

    // Assertion pour vérifier que la chanson n'existe pas
    expect(foundSong).toBeUndefined();
  });

  it("should throw when passing invalid object", async () => {
    // Send a create request to the item table with an empty object
    const promise = tables.song.addSong();

    // Assertions
    await expect(promise).rejects.toThrow();
  });
});

// test de modification d'une musique
describe("Update song", () => {
  it("should update a song successfully", async () => {
    // Création d'une musique pour la mettre à jour ensuite
    const newSongSample = {
      title: "Death by Glamour",
      link: "https://youtu.be/2TgO-tN5wAM?si=uGo6HUZXWQqhIMwF",
      embed:
        "https://www.youtube.com/embed/2TgO-tN5wAM?autoplay=1&si=B-ED1q_sAMPwpKma",
      game: "UNDERTALE",
    };

    // Ajouter la musique à la base de données pour obtenir son identifiant
    const { title, link, embed, game } = newSongSample;
    const resultAdd = await tables.song.addSong(title, link, embed, game);

    const { insertId } = resultAdd;

    createdSongIds.push(insertId);

    // Définition des nouvelles valeurs pour la mise à jour
    const updatedValues = {
      title: "New Song Title",
      link: "https://example.com",
      embed: "https://example.com/embed",
      game: "New Game",
    };

    // Mettre à jour la musique
    await tables.song.updateSong(
      insertId,
      updatedValues.title,
      updatedValues.link,
      updatedValues.embed,
      updatedValues.game
    );

    // Récupérer la musique mise à jour depuis la base de données
    const [updatedSong] = await database.query(
      "SELECT * FROM song WHERE id = ?",
      insertId
    );

    // Assertions
    expect(updatedSong).toBeDefined();
    expect(updatedSong[0].title).toBe(updatedValues.title);
    expect(updatedSong[0].link).toBe(updatedValues.link);
    expect(updatedSong[0].embed).toBe(`${updatedValues.embed}&autoplay=1`);
    expect(updatedSong[0].game).toBe(updatedValues.game);
  });
});

// Nettoyer les chansons après chaque test
afterEach(async () => {
  // Créer une liste de promesses de suppression
  const deletePromises = createdSongIds.map((id) => tables.song.removeById(id));

  // Attendre que toutes les suppressions soient terminées
  await Promise.all(deletePromises);

  // Réinitialiser la liste des identifiants de chansons créées
  createdSongIds = [];
});

// Fermeture de la connexion à la base de données après l'exécution de tous les tests
afterAll((done) => {
  database.end().then(done);
});
