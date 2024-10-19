const { DataTypes } = require('sequelize');
const { seque } = require("../../config/db");

const v_stat_event = seque.define('v_stat_event',{
    idevenement: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    montant: {
        type: DataTypes.FLOAT,
    },
    vente: {
        type: DataTypes.INTEGER,
    }
},{
    tableName: 'v_stat_event',
    timestamps: false,
});

module.exports = v_stat_event;