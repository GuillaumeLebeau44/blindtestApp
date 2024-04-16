// Import des dépendances
require("dotenv").config();
const { database, tables } = require("./setup");

describe("Test suite SCORE", () => {
  // Stocker l'identifiant du score créé pour chaque test
  let createdScoreId;

  // Test de base
  it("should pass", () => {
    // Assertion
    expect(true).toBe(true);
  });

  // Test de création d'un nouveau score
  it("should create a score successfully", async () => {
    // Objet de test pour le score

    // Utilisation de la méthode d'ajout de score
    const result = await tables.score.addScore({
      username: "TEST1",
      points: 1000,
    });
    const { insertId } = result;

    // Stocker l'ID du score créé
    createdScoreId = insertId;

    // Vérification si le score nouvellement ajouté existe dans la base de données
    const [rows] = await database.query(
      "select * from score where id = ?",
      insertId
    );

    const foundScore = rows[0];

    // Assertions
    expect(foundScore).toBeDefined();
    expect(foundScore.username).toBe("TEST1");
    expect(foundScore.points).toBe(1000);
  });

  it("should throw when passing invalid object", async () => {
    // Send a create request to the item table with an empty object
    const promise = tables.score.addScore({});

    // Assertions
    await expect(promise).rejects.toThrow();
  });

  // Nettoyer les données après chaque test
  afterEach(async () => {
    // Supprimer le score créé lors du test précédent
    await database.query("DELETE FROM score WHERE id = ?", [createdScoreId]);
    // Réinitialiser l'identifiant du score créé
    createdScoreId = null;
  });
});

// Fermeture de la connexion à la base de données après l'exécution de tous les tests
afterAll((done) => {
  database.end().then(done);
});
