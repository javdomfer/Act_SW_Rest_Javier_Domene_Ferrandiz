const data = require("../models/starwars.json");
exports.shortName = (character) => character.name.trim().split(" ")[0];
let starwars = data.map((c) => ({
  ...c,
  photo: `../images/${exports.shortName(c)}.jpg`,
}));

// CREATE

exports.newCharacter = (name, height, mass, photo) => {
  const characterNew = {
    name: name.trim(),
    height: height,
    mass: mass,
    photo: photo,
  };
  const short = exports.shortName(characterNew);
  if (exports.getByShortName(short)) {
    return null;
  }

  starwars.push(characterNew);

  return short;
};

// READ

exports.getAll = () => starwars;
exports.getByShortName = (name) => {
  if (!name) {
    return null;
  }

  const character = starwars.find((c) => exports.shortName(c).toLowerCase() === name.trim().toLowerCase());
  if (character) {
    return character;
  } else {
    return null;
  }
};
exports.getByName = (q) => {
  if (!q || q.trim() === "") {
    return null;
  }

  const character = starwars.find((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));
  if (character) {
    return character;
  } else {
    return null;
  }
};
exports.getCharacterInfo = async (name) => {
  const character = exports.getByShortName(name);
  if (!character) {
    return null;
  }

  let planet = null;
  try {
    if (character.homeworld) {
      const response = await fetch(character.homeworld);
      if (response.ok) {
        planet = await response.json();
      }
    }
  } catch (error) {
    console.log("No hay planeta");
  }

  return { character, planet };
};

// UPDATE

exports.updateCharacter = (name, { height, mass }) => {
  const character = exports.getByShortName(name);
  if (!character) {
    return null;
  }

  character.height = height;
  character.mass = mass;

  return character;
};

// DELETE

exports.deleteCharacter = (name) => {
  const character = exports.getByShortName(name);
  if (!character) {
    return false;
  }

  starwars = starwars.filter((c) => c !== character);

  return true;
};
