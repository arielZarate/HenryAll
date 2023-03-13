const { DataTypes, Op } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1

        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        [Op.between]: [1, 5],
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("VERANO", "OTOÑO", "INVIERNO", "PRIMAVERA"),
        allowNull: false,
      },

      //defino de tipo array y el tipo de dato del array
      countryId: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    },

    {
      timestamps: false,
    }
  );
};

/* 
Actividad Turística con las siguientes propiedades:
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
*/
