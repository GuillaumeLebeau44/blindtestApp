const AbstractManager = require("./AbstractManager");

class SongManager extends AbstractManager {
  constructor() {
    super({ table: "song" });
  }

  async readAllSongs() {
    const [songs] = await this.database.query(`SELECT * FROM ${this.table}`);
    return songs;
  }

  async readSongId(id) {
    const [song] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return song;
  }

  async addSong(title, link, embed, game) {
    const [song] = await this.database.query(
      `INSERT INTO ${this.table} (title, link, embed, game) VALUES (?, ?, ?, ?)`,
      [title, link, embed, game]
    );
    return song;
  }

  async removeById(id) {
    const [song] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return song;
  }
}

module.exports = SongManager;
