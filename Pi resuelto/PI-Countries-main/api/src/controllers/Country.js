const { Country, Activity } = require("../db"); //BASE DE DATOS
const { Op } = require("sequelize");

const getCountries = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const info = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      });
      //console.log(info);
      return res.status(200).json(info);
    } else {
      //ver si es un array
      const countryFilter = await Country.findAll({
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
        where: {
          //busca por cualquier frase ue incluye name e ignora los sentitive
          name: { [Op.iLike]: `%${name}%` },
        },
      });

      if (!countryFilter[0]) {
        console.log("error");

        return res.status(404).json({
          error: ` no se encuentra ningun Pais con el nombre , ${name}`,
        });
      }

      return res.json(countryFilter);
    }
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
};

//===================================================
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error(`empty parameter or undefined id`);
    } else {
      const countryCode = await Country.findByPk(id.toUpperCase(), {
        include: {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: {
            attributes: [],
          },
        },
      });
      if (!countryCode) {
        return res.status(404).send(`⚠ No country was found with that id`);
      } else {
        //me devuelve solo el country sin la actividades
        return res.status(200).json(countryCode);
      }
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = { getCountries, getById };

/* 
[ ] GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y
 guardarlos en su propia base de datos y luego ya utilizarlos desde allí 
 (Debe retonar sólo los datos necesarios para la ruta principal)
Obtener un listado de los paises.



[ ] GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes


[ ] GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado
*/
