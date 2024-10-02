const { Sequelize, DataTypes } = require('sequelize');
const { seque } = require('../../config/db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');

const historique = seque.define('historiqueachat',{
    tokenachat: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    idclient: {
        type: DataTypes.STRING,
        references: {
            model: 'clients',
            key: 'idclient',
        },
        allowNull: false,
    },
    idevenement: {
        type: DataTypes.STRING,
        references: {
            model: 'evenement',
            key: 'idevenement',
        },
        allowNull: false,
    },
    idbillet: {
        type: DataTypes.STRING,
        references: {
            model: 'billetevenement',
            key: 'idbillet',         
        },
        allowNull: false,
    },
    nombre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    montant: {
        type: DataTypes.NUMERIC(9,2),
        allowNull: false,
    },
    datetransaction: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        get() {
            const rawValue = this.getDataValue('datetransaction');
            if (rawValue) {
                return moment(rawValue).tz('Asia/Baghdad').format('DD-MM-YYYY HH:mm:ss');
            }
            return rawValue;
        },
    }
},{
    tableName: 'historiqueachat',
    timestamps: false
});

module.exports = historique;