const { DataTypes } = require('sequelize');
const { seque } = require("../../config/db");

const v_billet_stat_event = seque.define('v_billet_achat_event',{
    idevenement: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    idbillet: {
        type: DataTypes.INTEGER,
    },
    nombillet: {
        type: DataTypes.STRING,
    },
    tarifbillet: {
        type: DataTypes.FLOAT,
    },
    nomdevis: {
        type: DataTypes.STRING,
    },
    nombrebillet: {
        type: DataTypes.INTEGER,
    },
    total_achats: {
        type: DataTypes.INTEGER,
    }
},{
    tableName: 'v_billet_achat_event',
    timestamps: false,
});

module.exports = v_billet_stat_event;