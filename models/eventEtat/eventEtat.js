const { DataTypes } = require('sequelize');
const { seque } = require("../../config/db");

const eventEtat = seque.define('eventetat', {
    idetat: {
        type: DataTypes.INTEGER,
        references: {
            model: 'etat',
            key: 'idetat',
        },
        allowNull: false
    },
    idevenement: {
        type: DataTypes.STRING,
        references: {
            model: 'evenement',
            key: 'idevenement',
        },
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'eventetat',
    timestamps: false,
});

module.exports = eventEtat;
