const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING(3),
        // autoIncrement: true,  // NO PUEDO IR INCREMEN YA QUE NO ES NUMBER 😂
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      flags: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT(9, 4),
      },
      population: {
        type: DataTypes.INTEGER,
      },

      //este dato sirve para diferenciar entre los datos de la api y los creados por mi
      /*    createInDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }, */
    },
    {
      timestamps: false,
    }
  );
};

/* 
[ ] País con las siguientes propiedades:
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población

*/
