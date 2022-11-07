const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    try {
        const {code, name, age, race, hp, mana, date_added} = req.body
    
        if(!code || !name || !hp || !mana){
            return res.status(404).send("Falta enviar datos obligatorios")
        }
    
        const newCharacter = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        })

        return res.status(201).json(newCharacter)
        
    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
})


router.get('/', async (req, res) => {
    try {
        const { race } = req.query;

        if(!race){
            const allCharacters = await Character.findAll()
    
            return res.status(200).json(allCharacters)
        }
        else{
            const charactersByRace = await Character.findAll({
                where: { race }
            })

            return res.status(200).json(charactersByRace)
        }

    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
})


router.get('/:code', async (req, res) => {
    const { code } = req.params;

    const characterByPk = await Character.findByPk(code)

    if(!characterByPk) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)

    return res.status(200).json(characterByPk)
})


module.exports = router;