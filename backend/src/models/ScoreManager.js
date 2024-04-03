const AbstractManager = require("./AbstractManager");

class ScoreManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  async readAllScores() {
    const [scores] = await this.database.query(`SELECT * FROM ${this.table}`);
    return scores;
  }

  async addScore(score) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, points) VALUES (?, ?)`,
      [score.username, score.points]
    );
    return result;
  }
}
module.exports = ScoreManager;
