const { Sequelize, Op } = require("sequelize");

//IMPORTANDO LOS MODELS

const modelCharacter = require("./models/Character.js");
const modelAbility = require("./models/Ability.js");
const modelRole = require("./models/Role.js");

/* 

const db = new Sequelize('postgres://user:password@localhost:5432/henry_sequelize', {
  logging: false,
});
*/

//
/* const db = new Sequelize(
 "",
  {
    logging: false, //muestra info de mas larga
  }
); */

const db = new Sequelize("henry_sequelize", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

//debemos relacionar los archivos models com ls bd
modelCharacter(db);
modelAbility(db);
modelRole(db);

module.exports = {
  ...db.models,
  db,
  Op,
};
