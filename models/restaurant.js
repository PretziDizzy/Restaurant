const db = require('../db');
const { DataTypes, Model } = require('sequelize');
class Restaurant extends Model {}

Restaurant.init({
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    image: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },

    likes: {type: DataTypes.INTEGER, 
        defaultValue: 0}
    },
    
{
    sequelize: db,
    timestamps: false,
});

module.exports = Restaurant;