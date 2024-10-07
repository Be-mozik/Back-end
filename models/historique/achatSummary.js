const  DataTypes  = require('sequelize');
const { seque } = require("../../config/db");


const achatSummary = seque.define('achatSummary',{
    nb_achat: {
        type: DataTypes.INTEGER,
    },
    increase: {
        type: DataTypes.FLOAT,
    } 
},{
    tableName: 'achat_summary',
    timestamps: false,
    modelName: 'achatSummary',
});

module.exports = achatSummary;