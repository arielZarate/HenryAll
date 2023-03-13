const axios = require("axios");
const { UUIDV4 } = require("sequelize");
const { Country, Activity } = require("../db");

const url_base = process.env.URL_ALL;
//const url_name_code = process.env.URL_NAME_CODE;

const findOrCreateAll = async (req, res) => {
  try {
    const getApi = await axios.get(`${url_base}`);
    const ModelCountries = getApi.data.map((c) => {
      return {
        id: c.cca3 != undefined ? c.cca3 : UUIDV4,
        name: c.name.common,
        flags: c.flags != null ? c.flags[1] : "No Data",
        continents: c.continents != null ? c.continents[0] : "No Data",
        capital: c.capital != null ? c.capital[0] : "No Data",
        subregion: c.subregion != undefined ? c.subregion : "No Data",
        area: c.area,
        population: c.population,
      };
    });

    // console.log(ModelCountries);

    ModelCountries.forEach(async (e) => {
      await Country.findOrCreate({
        where: {
          id: e.id,
          name: e.name,
          flags: e.flags,
          continents: e.continents,
          capital: e.capital,
          subregion: e.subregion,
          area: e.area,
          population: e.population,
        },
      });
    });

    console.log(
      `
      💙🤍💙
      database created and running
      🖤💛💖
       `
    );
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/* const getByNameOrCode = async (param1, param2) => {
  const countryName = await axios.get(`${url_name_code}/${param1}/${param2}`);
  const countries = await countryName.data.map((c) => {
    if (
      c.cioc !== undefined &&
      c.flags !== undefined &&
      c.capital !== undefined &&
      c.continents !== undefined
    )
      return {
        id: c.cioc,
        name: c.name.official,
        flags: c.flags[1], // c.flags.map((f) => f), //array
        continents: c.continents[0], //c.continents.map((c) => c), //array
        capital: c.capital[0], //c.capital.map((c) => c), // array
        subregion: c.subregion,
        area: c.area,
        poblacion: +c.population,
      };
  });

  return countries;
};
 */

const getActivitiesAll = async () => {
  const get = await Activity.findAll();
  return get;
};

module.exports = { findOrCreateAll, getActivitiesAll };
