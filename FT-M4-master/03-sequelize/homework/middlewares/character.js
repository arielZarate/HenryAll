const { Router } = require("express");
const { Op, Character, Role } = require("../db");
const router = Router();

/* 
POST /character
Debe recibir por body los datos del modelo de Character y crear una instancia
del mismo en la base de datos.

De no recibir todos los parámetros necesarios debería devolver un status 404
 con el mensaje "Falta enviar datos obligatorios"
Si alguna validación interna de la base de datos falle debe devolver un status 
404 con el mensaje "Error en alguno de los datos provistos"
Si todos los datos son provistos debera devolver un status 201 y 
el objeto del personaje
*/

const createCharacter = async (req, res) => {
  //const cuerpo = req.body;
  // console.log(JSON.stringify(cuerpo));
  try {
    const { code, name, age, race, hp, mana, date_added } = req.body;

    /*  if (!code || !name || !age || !race || !hp || !mana || !date_added) {
            return res.status(404).send("Falta enviar datos obligatorios");
          }  */

    if (!code || !name || !hp || !mana) {
      return res.status(404).send("Falta enviar datos obligatorios");
    } else {
      const newObj = await Character.create({
        code,
        name,
        age,
        race,
        hp,
        mana,
        date_added,
      });

      return res.status(201).json(newObj);
    }
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
};

router.post("/", createCharacter);

/* GET /character
Debe retornar todos los personajes que se encuentren creados en la base de datos.
 Además este endpoint debe aceptar por query un valor de una raza para filtrar
  los resultados, por ejemplo: GET /character?race=human


Adicionalmente pueden hacer que reciba por query los atributos
 que quiera devolver en el caso de no querer todos, por ejemplo:
  GET /character?name=true&hp=true 
  
  //////////segunda parte///////////////
  GET /character
Volvamos a la ruta que habíamos hecho en la parte uno, ahora vamos a
 agregarle tambien que pueda recibir un age por query y que el filtro
  sea un AND de ambos campos, es decir que traiga aquellos personajes 
  que tengan la raza dada en race y la edad dada en age.


Adicionalmente pueden hacer que de forma dinámica pueda filtrar por 
cualquiera de los atributos del modelo de Character y no solamente 
por race y age, tengan en cuenta que pueden pasarle la cantidad de
 parámetros que quieran, desde ninguno hasta todos.
  */

const getCharacter = async (req, res) => {
  /* 
////antes////////

try {
    const { race, age } = req.query;

    if (!race) {
      const allCharacters = await Character.findAll();

      return res.status(200).json(allCharacters);
    } else {
      const charactersByRace = await Character.findAll({
        where: { race, age },
      });

      return res.status(200).json(charactersByRace);
    }
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  } */

  try {
    const { race, age } = req.query;

    const condition = {};
    const where = {};

    if (race) where.race = race;
    // where: { race }
    if (age) where.age = age;
    // where: { race, age }
    condition.where = where;
    // { where: { race, age } }

    const character = await Character.findAll(condition);
    return res.status(200).json(character);
  } catch (error) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
};

router.get("/", getCharacter);
//=================================================================

/* 
GET /characters/roles/:code
Crearemos otro endpoint para obtener todos los datos del personajes pero incluyendo también la
 información asociada a sus roles. Por ejemplo debería devolver algo así:

*/

router.get("/roles/:code", async (req, res) => {
  try {
    const { code } = req.params;
    //primero buscamos por el pk y ademas trae por los roles
    const character = await Character.findByPk(code, { include: Role });
    res.status(200).json(character);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

/*






=================================================================== 
GET /character/:code
Debe retornar aquel personaje que coincida con el código enviado.
En el caso de no encontrarlo debe responder con status code 404 y el mensaje
 "El código ${codigo} no corresponde a un personaje existente"

*/
const getCharacterCode = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(404).send("Falta parametro");
    } else {
      const characterCode = await Character.findByPk(code);
      if (!characterCode) {
        return res
          .status(404)
          .send(`El código ${code} no corresponde a un personaje existente`);
      }
      return res.status(201).json(characterCode);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
router.get("/:code", getCharacterCode);

//========================
/* 





GET /character/young
Implementaremos un nuevo endpoint que deberá traer todos los 
personajes considerados "jovenes" que serán aquellos con menos de 
25 años. CUIDADO con el orden de las rutas...
*/

router.get(`/young`, async (req, res) => {
  try {
    const characterYoung = await Character.findAll({
      where: { [Op.lt]: 25 },
    });

    return res.status(200).json(characterYoung);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

/* 







PUT /character/addAbilities
Similar al enpodint anterior pero ahora queremos poder desde el lado del personaje agregar una
 o mas habilidades en simultaneo que las recibiremos como un array dentro del body del request:
*/
router.put("/addAbilities", async (req, res) => {
  try {
    const { codeCharacter, abilities } = req.body;
    const character = await Character.findByPk(codeCharacter);

    const promises = abilities.map((ab) => character.createAbility(ab));
    await Promise.all(promises);
    return res.status(200).json("salio todo ok");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

/* 











PUT /character/:attribute?value=...
Vamos a crear un PUT el cual va a recibir un atributo como param y un value 
como query y deberá modificar todos los valores de dicho atributo con el valor
 dado para todas las instancias de personajes que existan en la base de datos
  y cuyo valor de ese atributo sea null.

Es decir si se hace un request PUT a /character/age?value=40 deberá buscar 
todos los personajes cuya edad sea null y a esos reemplazarlos por el valor 40.

Devolver simplemente un mensaje que diga 'Personajes actualizados'

Getter

*/

router.put("/:attribute", async (req, res) => {
  try {
    const { attribute } = req.params;
    const { value } = req.query;

    await Character.update(
      { [attribute]: value },
      {
        where: {
          [attribute]: null,
        },
      }
    );

    return res.status(200).send("Personajes actualizados");
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

/* 












Getter
Vamos a definir un getter para el atributo age de los personajes, 
lo que queremos es que nos devuelva el valor de su edad pero 
concatenado con la frase 'years old' por lo que para un personaje 
que tenga 27 años nos debería devoler '27 years old'.

IMPORTANTE: Esto hará que rompan algunos tests anteriores que 
esperaban solamente el valor, animate y arreglalos, ya sabes 
como funcionan los tests.




=======================================================

Virtual Field
Ahora crearemos un campo virtual para el modelo de Ability que será como un mini 
resumen de la habilidad y lo llamaremos "summary", deberá retornar "{name}
 (name({mana_cost} points of mana) - Description: ${description}"
  (La mana tienen que ser solo la parte entera).
*/

module.exports = router;
