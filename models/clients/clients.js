const { Sequelize, DataTypes } = require("sequelize");
const { seque } = require('../../config/db');

const clients = seque.define('clients',{
    idclient: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`CONCAT('Client ',nextval('seq_client'))`),
    },
    nomclient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenomclient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailclient: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mdpclient: {
        type: DataTypes.STRING,
    },
    dateclient: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
    },
},{
    tableName: 'clients',
    timestamps: false
});

module.exports =  clients;