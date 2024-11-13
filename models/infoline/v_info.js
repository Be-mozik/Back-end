const {DataTypes} = require('sequelize');
const {seque} = require("../../config/db");

const v_info = seque.define('v_info',{
    idevenement: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    idinfo: {
        type: DataTypes.STRING,
    },
    nominfo: {
        type: DataTypes.STRING,
    },
    numeroinfo: {
        type: DataTypes.STRING,
    }
},{
    tableName: 'v_info',
    timestamps: false,
});

module.exports = v_info;