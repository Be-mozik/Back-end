const {DataTypes} = require('sequelize');
const {seque} = require("../../config/db");
const moment = require('moment-timezone');


const v_event = seque.define('v_event',{
    idevenement :{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    idutilisateur: {
        type: DataTypes.STRING,
    },
    nomevenement: {
        type: DataTypes.STRING,
    },
    dateheureevenement: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('dateheureevenement');
            if (rawValue) {
                return moment(rawValue).tz('Asia/Baghdad').format('DD-MM-YYYY HH:mm:ss');
            }
            return rawValue;
        }
    },
    lieuevenement: {
        type: DataTypes.STRING,
    },
    descrievenement: {
        type: DataTypes.STRING,
    },
    imgevenement: {
        type: DataTypes.STRING,
    },
    idetat: {
        type: DataTypes.INTEGER,
    },
    nometat: {
        type: DataTypes.STRING,
    }
},{
    tableName: 'v_event',
    timestamps: false,
})

module.exports = v_event;