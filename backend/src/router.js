const express = require("express");

const router = express.Router();

const { verifyToken } = require("./middlewares/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const songControllers = require("./controllers/songControllers");
const scoreControllers = require("./controllers/scoreControllers");
const authControllers = require("./controllers/authControllers");
const {
  validateAddSong,
  validateEditSong,
} = require("./middlewares/songValidation");

// Route to get a list of items
router.get("/items", itemControllers.browse);
router.get("/songs", songControllers.browse);
router.get("/scores", scoreControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);
router.get("/songs/:id", songControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/scores", scoreControllers.add);
router.post("/login", authControllers.login);

// admin
router.use(verifyToken);

router.post("/songsadd", verifyToken, validateAddSong, songControllers.add);
router.put("/songs/:id", verifyToken, validateEditSong, songControllers.edit);
router.delete("/songsdel/:id", verifyToken, songControllers.remove);

/* ************************************************************************* */

module.exports = router;
