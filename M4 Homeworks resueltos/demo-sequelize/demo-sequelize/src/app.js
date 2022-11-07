const express = require('express');
const morgan = require('morgan');
const { User } = require('./db')

const server = express()

server.use(express.json())
server.use(morgan('dev'))

server.post('/user', async (req, res) => {
    try {
        const { name, last_name, birthday } = req.body;

        const newUser = await User.create({
            name, last_name, birthday
        })

        return res.status(200).json(newUser)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

server.get('/user', async(req, res) => {
    try {
        const { name } = req.query;

        if(!name){
            // const allUsers = await User.findAll({
            //     attributes: ['name', 'last_name']
            // })
            const allUsers = await User.findAll({
                attributes: {exclude: ['birthday']}
            })
    
            return res.status(200).json(allUsers)
        }
        else{
            const users = await User.findAll({
                where: { name }
            })

            return res.status(200).json(users)
        }

    } catch (error) {
        return res.status(404).send(error.message)
    }
})


server.get('/user/find', async (req, res) => {
    try {
        const { name, last_name, birthday } = req.body;
        const user = await User.findOrCreate({
            where: { name },
            defaults: {
                last_name,
                birthday
            }
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})



server.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const userByPk = await User.findByPk(id)

        if(!userByPk) throw new Error('El usuario no existe')

        return res.status(200).json(userByPk)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

server.post('/user/bulk', async(req, res) => {
    try {
        const data = req.body;

        const newUsers = await User.bulkCreate(data)

        return res.status(200).json(newUsers)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})




server.delete('/user/:id', async (req, res) => {{
    try {
        const { id } = req.params;

        const userByPk = await User.findOne({
            where: { id }
        })

        if(!userByPk) throw new Error('El usuario no existe')
        // console.log(userByPk)
        userByPk.destroy()

        return res.status(200).json(userByPk)

    } catch (error) {
        return res.status(404).send(error.message)
    }
}})



module.exports = server;