const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT id as id, pseudo, email, hashed_password, created_date, updated_date, is_admin
      FROM ${this.table}
      WHERE email = ?`,
      [email]
    );
    return result[0];
  }
}

module.exports = UserManager;
