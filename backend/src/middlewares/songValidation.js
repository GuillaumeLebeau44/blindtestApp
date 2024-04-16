const Joi = require("joi");

// Schéma de validation pour l'ajout d'une chanson
const addSongSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().required(),
  embed: Joi.string().uri().required(),
  game: Joi.string().required(),
});

// Schéma de validation pour la modification d'une chanson
const editSongSchema = Joi.object({
  song_title: Joi.string().required(),
  song_link: Joi.string().uri().required(),
  song_embed: Joi.string().uri().required(),
  song_game: Joi.string().required(),
});

// Middleware pour valider les données lors de l'ajout d'une chanson
const validateAddSong = (req, res, next) => {
  const { error } = addSongSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
  return undefined;
};

// Middleware pour valider les données lors de la modification d'une chanson
const validateEditSong = (req, res, next) => {
  const { error } = editSongSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
  return undefined;
};

module.exports = { validateAddSong, validateEditSong };
