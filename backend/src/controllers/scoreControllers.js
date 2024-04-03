const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const scores = await tables.score.readAllScores();
    res.status(200).json(scores);
    console.info(scores);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const add = async (req, res, next) => {
  const { username, score } = req.body;
  if (username.length === 5) {
    try {
      const insertId = await tables.score.addScore({
        username,
        points: score,
      });

      res.status(201).json({ insertId });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = {
  browse,
  add,
};
