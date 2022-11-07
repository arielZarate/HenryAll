const { DataTypes } = require('sequelize')


module.exports = sequelize => {
    sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}