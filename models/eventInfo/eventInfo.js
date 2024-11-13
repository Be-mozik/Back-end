const {DataTypes} = require('sequelize');
const {seque} = require("../../config/db");

const eventInfo = seque.define('eventInfo',{
    idinfo: {
        type: DataTypes.STRING,
    },
    idevenement: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
},{
    tableName: 'eventinfo',
    timestamps: false,
});

module.exports = eventInfo;