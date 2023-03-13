const { Country, Activity } = require("../db");

//async await
const createActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countryId } = req.body;

    //console.log(name, dificulty, duration, season);
    if (!name) {
      throw new Error(` ${name} parameter not found`);
    } else {
      //le podria haber pasado el body
      const objActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        countryId, //este id viene de un selector que va tener un value con el code
      });
      //una vez creado la actividad con su idCountry fk, lo busco
      const countryMatch = await Country.findAll({
        where: {
          id: countryId,
        },
      });

      //LO QUE AGREGUE
      // console.log(countryMatch);
      objActivity.addCountry(countryMatch);

      res.json(objActivity);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getActivity = async (req, res) => {
  try {
    const getAll = await Activity.findAll();
    getAll.length ? res.json(getAll) : res.send("activity not found");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
const getActivityByDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) return res.send("detail not found");
    return res.json(activity);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const modifyActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);

    if (!activity) {
      throw new Error("Activy NOT found by Id");
    } else {
      const { name, difficulty, duration, season } = req.body;

      if (name) activity.name = name;
      if (difficulty) activity.difficulty = difficulty;
      if (duration) activity.duration = duration;
      if (season) activity.season = season;

      //res.json(activity);
      await activity.save();
      res.json(activity);
      //console.log(activity);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.destroy(
      {
        where: { id: id },
      },
      {
        // paranoid: true,
        force: true,
      }
    );
    if (!activity) return res.send("activity not deleted");

    //res.status(200).json("Activity Deleted");
    return res.json(activity);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

//const modifyActivity = () => {};
module.exports = {
  createActivity,
  getActivity,
  modifyActivity,
  deleteActivity,
  getActivityByDetail,
};
