const { Router } = require("express");
const { Ability } = require("../db");
const router = Router();

/* 

POST /ability
Debe recibir por body los datos del modelo de Ability y crear una instancia del mismo en la base de datos.

De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje 
"Falta enviar datos obligatorios"
Si todos los datos son provistos debera devolver un status 201 y el objeto de la habilidad

============================================
PUT /ability/setCharacter
Recibirá por body idAbility y codeCharacter y deberá asociarlos a partir del modelo de Ability y
 devolver el objeto de habilidad con name, description, mana_cost y CharacterCode.
===========================================
PUT /character/addAbilities
Similar al enpodint anterior pero ahora queremos poder desde el lado del personaje agregar una
 o mas habilidades en simultaneo que las recibiremos como un array dentro del body del request:

*/

router.post(`/`, async (req, res) => {
  try {
    const { name, description, mana_cost } = req.body;

    if (!name || !mana_cost)
      //return res.status(404).send("Falta enviar datos obligatorios");
      throw new Error("Falta enviar datos obligatorios");

    const ability = await Ability.create(name, description, mana_cost);
    res.status(201).json(ability);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

router.put("/setCharacter", async (req, res) => {
  try {
    const { idAbility, codeCharacter } = req.body;
    //busco por habilidaD
    const ability = await Ability.findByPk(idAbility);
    //setCharacter sale del modelo reado de sequelize
    await ability.setCharacter(codeCharacter);

    return res.status(201).json(ability);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;
