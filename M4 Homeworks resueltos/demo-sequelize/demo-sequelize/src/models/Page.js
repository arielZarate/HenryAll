const { DataTypes } = require('sequelize')


module.exports = sequelize => {
    sequelize.define('Page', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        page_name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}