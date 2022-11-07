const { Router } = require("express");
const { Op, Character, Role } = require("../db");
const router = Router();

module.exports = router;

router.post("/", async (req, res) => {
  try {
    const { code, name, age, race, hp, mana, date_added } = req.body;

    if (!code || !name || !hp || !mana) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }

    const newCharacter = await Character.create({
      code,
      name,
      age,
      race,
      hp,
      mana,
      date_added,
    });

    return res.status(201).json(newCharacter);
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
});

/* 



### GET /character

Volvamos a la ruta que habíamos hecho en la parte uno, ahora vamos a agregarle tambien que pueda recibir 
un age por query y que el filtro sea un AND de ambos campos, es decir que traiga aquellos personajes que 
tengan la raza dada en race y la edad dada en age.

<img style="float: left; padding-right: 10px" src="./img/extra.png">

Adicionalmente pueden hacer que de forma dinámica pueda filtrar por cualquiera de los atributos 
del modelo de Character y no solamente por race y age, tengan en cuenta que pueden pasarle
 la cantidad de parámetros que quieran, desde ninguno hasta todos.








*/

router.get("/", async (req, res) => {
  try {
    const { race, age } = req.query;

    const condition = {};
    const where = {};

    if (race) where.race = race;
    if (age) where.age = age;
    condition.where = wher;
    const character = await Character.findAll(condition);
    return res.status(200).json(character);

    /*    if (!race) {
      const allCharacters = await Character.findAll();

      return res.status(200).json(allCharacters);
    } else {
      const charactersByRace = await Character.findAll({
        where: { race },
      });

      return res.status(200).json(charactersByRace);
    } */
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
});

/* 
### GET /character/young

Implementaremos un nuevo endpoint que deberá traer todos los personajes considerados "jovenes" 
que serán aquellos con menos de 25 años. CUIDADO con el orden de las rutas...
*/

router.get("/young", async (req, res) => {
  try {
    const character = await Character.findAll({
      where: {
        //OPERADORES DENTRO DE SEQUELIZE
        [Op.lt]: 25,
      },
    });

    return res.status(200).json(character);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const characterByPk = await Character.findByPk(code);

  if (!characterByPk)
    return res
      .status(404)
      .send(`El código ${code} no corresponde a un personaje existente`);

  return res.status(200).json(characterByPk);
});

/* 


### PUT /character/:attribute?value=...

Vamos a crear un PUT el cual va a recibir un atributo como param y 
un value como query y deberá modificar todos los valores de dicho atributo 
con el valor dado para todas las instancias de personajes que existan en la 
base de datos y cuyo valor de ese atributo sea null.

Es decir si se hace un request PUT a /character/age?value=40 deberá 
buscar todos los personajes cuya edad sea null y a esos reemplazarlos
 por el valor 40.

Devolver simplemente un mensaje que diga 'Personajes actualizados'



*/

//LA QUERY NO MODIFICA LA RUTA

router.put("/:atribute", async (req, res) => {
  try {
    const { attribute } = req.params;
    const { value } = req.query;

    await Character.update(
      { [attribute]: value },
      { where: { [attribute]: null } }
    );
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

/* 
### Getter

Vamos a definir un getter para el atributo age de los personajes, lo que queremos es que nos devuelva el valor de su edad pero concatenado con la frase 'years old' por lo que para un personaje que tenga 27 años nos debería devoler '27 years old'.

IMPORTANTE: Esto hará que rompan algunos tests anteriores que esperaban solamente el valor, animate y arreglalos, ya sabes como funcionan los tests.
*/

/*





codigo de la primera parte 




router.post("/", async (req, res) => {
  try {
    const { code, name, age, race, hp, mana, date_added } = req.body;

    if (!code || !name || !hp || !mana) {
      return res.status(404).send("falta enviar datos obligatorios");
    }
    const newCharacter = await Character.create({
      code,
      name,
      age,
      race,
      hp,
      mana,
      date_added,
    });

    return res.status(201).json(newCharacter);
  } catch (error) {
    return res.status(404).send("Error en alguno de los parametros");
  }
});

//

router.get("/", async (req, res) => {
  try {
    const { race } = req.query;

    if (!race) {
      const allCharacter = await Character.findAll();
      res.status(201).json(allCharacter);
    } else {
      const CharacterByRace = await Character.findAll({
        where: { race },
      });

      return res.status(201).json(CharacterByRace);
    }
  } catch (error) {
    res.status(404).send("Error en algun parametro");
  }
});

//

router.get("/", async (req, res) => {
  const { code } = req.params;

  const characterByPk = await Character.findByPk(code);

  if (!characterByPk)
    return res.status(404).send("no corresponde a un personaje existente");
  return res.status(201).json(characterByPk);
});
 */
