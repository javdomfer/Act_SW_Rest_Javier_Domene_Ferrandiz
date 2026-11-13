const swService = require("../services/sw.service");

// CREATE

exports.showCreateCharacter = (req, res) => {
  try {
    res.render("new.ejs");
  } catch (error) {
    res.render("error.ejs", { msg: "Error de formulario de creación" });
  }
};

exports.createCharacter = (req, res) => {
  try {
    const { name, height, mass, photo } = req.body;
    const shortName = swService.newCharacter(name, height, mass, photo);
    if (!shortName) {
      return res.render("error.ejs", { msg: "Ya existe un personaje con ese nombre" });
    }

    res.redirect(`/starwars/${shortName}`);
  } catch (error) {
    res.render("error.ejs", { msg: "Error durante la creación del personaje" });
  }
};

// READ

exports.getCharacters = (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      const characters = swService.getAll();
      return res.render("index.ejs", { characters });
    }

    const character = swService.getByName(q);
    if (!character) {
      return res.render("error.ejs", { msg: `No se ha encontrado ningún personaje con "${q}"` });
    }

    res.redirect(`/starwars/${swService.shortName(character)}`);
  } catch (error) {
    res.render("error.ejs", { msg: "Error buscando personaje" });
  }
};

exports.getCharacterByName = async (req, res) => {
  try {
    const { name } = req.params;
    const data = await swService.getCharacterInfo(name);
    if (!data) {
      return res.render("error.ejs", { msg: "Personaje no encontrado" });
    }

    const character = data.character;
    const planet = data.planet;
    res.render("show.ejs", { character, planet });
  } catch (error) {
    res.render("error.ejs", { msg: "Error mostrando personaje" });
  }
};

// UPDATE

exports.showUpdateCharacter = (req, res) => {
  try {
    const { name } = req.params;
    const character = swService.getByShortName(name);
    if (!character) {
      return res.render("error.ejs", { msg: "Personaje no encontrado" });
    }

    res.render("edit.ejs", { character });
  } catch (error) {
    res.render("error.ejs", { msg: "Error de formulario de edición" });
  }
};

exports.updateCharacter = (req, res) => {
  try {
    const { name } = req.params;
    const { height, mass } = req.body;
    if (!height) {
      return res.render("error.ejs", { msg: "Altura inválida" });
    }

    if (!mass) {
      return res.render("error.ejs", { msg: "Peso inválido" });
    }

    const character = swService.updateCharacter(name, { height, mass });
    if (!character) {
      return res.render("error.ejs", { msg: "Personaje no encontrado" });
    }

    res.redirect(`/starwars/${swService.shortName(character)}`);
  } catch (error) {
    res.render("error.ejs", { msg: "Error editando personaje" });
  }
};

// DELETE

exports.deleteCharacter = (req, res) => {
  try {
    const { name } = req.params;
    const deletedCharacter = swService.deleteCharacter(name);
    if (!deletedCharacter) {
      return res.render("error.ejs", { msg: "El personaje no existe" });
    }

    res.redirect("/starwars");
  } catch (error) {
    res.render("error.ejs", { msg: "Error borrando personaje" });
  }
};
