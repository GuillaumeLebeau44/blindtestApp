const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  async readAllScores() {
    const [scores] = await this.database.query(
      `SELECT * FROM ${this.table} ORDER BY points ASC`
    );
    return scores;
  }

  async addScore({ username, points }) {
    // Sélectionner les trois meilleurs scores de l'utilisateur
    const [userTopScores] = await this.database.query(
      `SELECT points FROM ${this.table} WHERE username = ? ORDER BY points ASC LIMIT 1`,
      [username]
    );

    // Vérifier si l'utilisateur a déjà trois scores
    if (userTopScores.length === 1) {
      // Récupérer le score le plus élevé parmi les trois
      const highestTopScore = userTopScores[0].points;

      // Si le nouveau score est inférieur ou égal au score le plus élevé parmi les trois, ne pas l'insérer
      if (points >= highestTopScore) {
        return null;
      }
      // Supprimer le score le plus élevé (le moins bon) de l'utilisateur pour faire de la place
      await this.database.query(
        `DELETE FROM ${this.table} WHERE username = ? AND points = ? LIMIT 1`,
        [username, highestTopScore]
      );
    }

    // Vérifier si le nombre total de scores dépasse 50, supprimer le plus élevé
    const [totalScoreCount] = await this.database.query(
      `SELECT COUNT(*) as count FROM ${this.table}`
    );
    if (totalScoreCount[0].count >= 20) {
      await this.database.query(
        `DELETE FROM ${this.table} ORDER BY points DESC LIMIT 1`
      );
    }

    // Insérer le nouveau score
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, points) VALUES (?, ?)`,
      [username, points]
    );
    return result;
  }
}
module.exports = ScoreManager;
