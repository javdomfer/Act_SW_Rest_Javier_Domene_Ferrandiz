const swController = require("../controllers/sw.controller");
const express = require("express");
const router = express.Router();

router.get("/", swController.getCharacters); // READ
router.get("/new", swController.showCreateCharacter); // CREATE
router.post("/", swController.createCharacter); // CREATE
router.get("/:name", swController.getCharacterByName); // READ
router.get("/:name/edit", swController.showUpdateCharacter); // UPDATE
router.patch("/:name", swController.updateCharacter); // UPDATE
router.delete("/:name", swController.deleteCharacter); // DELETE

module.exports = router;
