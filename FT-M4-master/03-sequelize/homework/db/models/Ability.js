const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ability", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "CompositeTuki",
    },
    description: {
      type: DataTypes.TEXT,
    },

    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: "compositeTuki",

      validate: {
        min: 10.0,
        max: 250.0,
      },
    },

    /* 

Ability
name*: string
description: text
mana_cost*: float




Validations
Vamos a agregar algunas validaciones a nivel base de datos:

Ability - mana_cost: el valor debe estar entre 10.0 y 250.0
Character - name: el valor no puede ser "Henry", "SoyHenry" o "Soy Henry"
Character - code: similar al name vamos a hacer que no pueda ser "HENRY" pero
incluyendo cualquier variación/combinación de mayúsculas y minísculas 
(Armar un custom validator).

*/

    /* 
    
    Virtual Field
Ahora crearemos un campo virtual para el modelo de Ability que será como un mini 
resumen de la habilidad y lo llamaremos "summary", deberá retornar "{name} 
(name({mana_cost} points of mana) - Description: ${description}" 
(La mana tienen que ser solo la parte entera).



es un getter
    */
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} (${Math.floor(
          this.mana_cost
        )} points of mana) - Description: ${this.description}`;
      },
    },
  });
};
