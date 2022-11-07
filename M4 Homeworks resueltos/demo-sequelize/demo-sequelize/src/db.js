const { Sequelize } = require('sequelize')
const userModel = require('./models/User')
const postModel = require('./models/Post')
const pageModel = require('./models/Page')

const db = new Sequelize('postgres://postgres:123456@localhost:5432/demo', {
    logging: false
})

userModel(db)
postModel(db)
pageModel(db)

console.log(db.models);

const { User, Post, Page } = db.models;

User.hasMany(Post)
Post.belongsTo(User)

User.belongsToMany(Page, { through: 'UserxPage' })
Page.belongsToMany(User, { through: 'UserxPage' })

module.exports = {
    ...db.models,
    db
}