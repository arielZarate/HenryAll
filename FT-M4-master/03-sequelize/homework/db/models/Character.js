const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Character",
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,

        //agregados de la parte 2
        get() {
          const value = this.getDataValue("age");
          return value ? value + "years old" : null;
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
{
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, //le dice que es obligatorio
      },
      age: {
        type: DataTypes.INTEGER,
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
        defaultValue: "other",
      },
      hp: {
        type: DataTypes.FLOAT,
        allowNull: false, //le dice que es obligatorio
      },
      mana: {
        type: DataTypes.FLOAT,
        allowNull: false, //le dice que es obligatorio
      },
      date_added: {
        //ess fecha
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    //datos agregados
    {
      //datos agregados
      timestamps: false,
    }

*/
