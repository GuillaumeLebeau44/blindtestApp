const cron = require("node-cron");
const client = require("../../database/client");

// Tâche planifiée pour vider complètement la table des scores chaque jour à minuit
cron.schedule("0 0 * * *", async () => {
  try {
    const connection = await client.getConnection();

    // Vider complètement la table des scores dans la base de données
    await connection.query("DELETE FROM score");

    connection.release();
    console.info("Table des scores vidée avec succès.");
  } catch (error) {
    console.error("Erreur lors du vidage de la table des scores :", error);
  }
});
