const tables = require("../tables");

const browse = async (req, res) => {
  try {
    const songs = await tables.song.readAllSongs();
    res.status(200).json(songs);
    console.info(songs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const read = async (req, res) => {
  try {
    const song = await tables.song.readSongId(req.params.id);
    res.status(200).json(song);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const add = async (req, res, next) => {
  const song = req.body;
  try {
    const insertId = await tables.song.addSong(
      song.title,
      song.link,
      song.embed,
      song.game
    );

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const removeId = await tables.song.removeById(req.params.id);
    res.status(200).json({ removeId });
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  browse,
  read,
  add,
  remove,
};
