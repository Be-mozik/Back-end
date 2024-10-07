const { Sequelize, DataTypes } = require("sequelize");
const { seque } = require("../../config/db");

const eventSummary = seque.define('eventSummary',{
    nb_event: {
        type: DataTypes.INTEGER,
    },
    increase: {
        type: DataTypes.FLOAT,
    }
},{
    tableName: 'event_summary',
    timestamps: false,
});

module.exports = eventSummary;