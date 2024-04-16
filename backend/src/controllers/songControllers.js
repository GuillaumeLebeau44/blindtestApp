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

const edit = async (req, res, next) => {
  try {
    const songId = req.params.id;
    const modifiedSongData = req.body;

    const updatedSong = await tables.song.updateSong(
      songId,
      modifiedSongData.song_title,
      modifiedSongData.song_link,
      modifiedSongData.song_embed,
      modifiedSongData.song_game
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Chanson non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Chanson modifiée avec succès", song: updatedSong });
  } catch (err) {
    next(err);
  }
  return null;
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
  edit,
  remove,
};
