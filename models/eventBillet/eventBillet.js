const {DataTypes} = require('sequelize');
const {seque} = require("../../config/db");

const eventBillet = seque.define('eventBillet',{
    idbillet : {
        type: DataTypes.STRING,
    },
    idevenement: {
        type: DataTypes.STRING,
        primaryKey: true,
    }
},{
    tableName: 'eventbillet',
    timestamps: false,
});

module.exports = eventBillet;