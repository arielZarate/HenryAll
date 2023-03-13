const { Sequelize, Op } = require("sequelize");
const modelCharacter = require("./models/Character.js");
const modelAbility = require("./models/Ability.js");
const modelRole = require("./models/Role.js");

/* const db = new Sequelize(
  "postgres://postgres:admin@localhost:5432/henry_sequelize",
  {
    logging: false,
  }
); */

const db = new Sequelize("henry_sequelize", "postgres", "admin", {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

/* 

Relaciones
Ya tenemos todos los modelos creados y funcionando correctamente pero cada uno por su
 cuenta, deberíamos relacionarlos de la siguiente forma:

  const { Character, Ability, Role} = db.models;
Ahora si tienen que usar los métodos hasOne, belongsTo, hasMany o belongsToMany según corresponda.ç


MIN -> 1:47 VIDEO

*/
const { Ability, Character, Role } = db.models;

Character.hasMany(Ability); //un chara tiene * ability
Ability.belongsTo(Character); //las ability perteneec a Chara

//tabla intermedia Character_role
Character.belongsToMany(Role, { through: "Character_Role" });
Role.belongsToMany(Character, { through: "Character_Role" });

module.exports = {
  ...db.models,
  db,
  Op,
};
