const { DataTypes } = require('sequelize');
const { seque } = require("../../config/db");

const etat = seque.define('etat',{
    idetat:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nometat: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'etat',
    timestamps: false,
});

module.exports = etat;