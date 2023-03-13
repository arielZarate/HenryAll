const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Character",
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,

        //permitir null: false
        allowNull: false,

        /* 
         code: similar al name vamos a hacer que no pueda ser "HENRY" pero
incluyendo cualquier variación/combinación de mayúsculas y minísculas 
        */

        validate: {
          //creo una funcion querecibe y lo verifica
          isNotHenry(value) {
            if (value.toLowerCase() === "henry") {
              throw new Error("is henry ");
            }
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,

        //Character - name: el valor no puede ser "Henry", "SoyHenry" o "Soy Henry"
        validate: {
          notIn: [["Henry", "SoyHenry", "Soy Henry"]],
        },
      },

      age: {
        type: DataTypes.INTEGER,

        //modifca el usuario cuando devuelve el dato
        get() {
          const value = this.getDataValue("age");
          return value ? value + " years old" : null;
        },
      },
      race: {
        type: DataTypes.ENUM(
          "Human",
          "Elf",
          "Machine",
          "Demon",
          "Animal",
          "Other"
        ),

        //por default
        defaultValue: "Other",
      },

      hp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mana: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },

    {
      timestamps: false,
    }
  );
};

/*
Validations
Vamos a agregar algunas validaciones a nivel base de datos:

Character - name: el valor no puede ser "Henry", "SoyHenry" o "Soy Henry"
Character - code: similar al name vamos a hacer que no pueda ser "HENRY" pero
incluyendo cualquier variación/combinación de mayúsculas y minísculas 
(Armar un custom validator).

*/
/* 
code*: string (Máximo 5 caracteres) [PK]
name*: string (Debe ser único)
age: integer
race: enum (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
hp*: float
mana*: float
date_added: timestamp without time


*/
