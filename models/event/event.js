const { Sequelize, DataTypes } = require("sequelize");
const { seque } = require('../../config/db');
const moment = require('moment-timezone');

class Event{
    constructor(idEvenement,idUtilisateur,nomEvenement,dateheureEvenement,lieuEvenement,descriEvenement,imgEvenement){
        this.idEvenement = idEvenement;
        this.idUtilisateur = idUtilisateur;
        this.nomEvenement = nomEvenement;
        this.dateheureEvenement = dateheureEvenement;
        this.lieuEvenement = lieuEvenement;
        this.descriEvenement = descriEvenement;
        this.imgEvenement = imgEvenement;
    }

    getEvenement() {
        return `${this.idEvenement}
                ${this.idUtilisateur}
                ${this.nomEvenement}
                ${this.dateheureEvenement}
                ${this.lieuEvenement}
                ${this.descriEvenement}
                ${this.imgEvenement}`
    }
}

const evenement = seque.define('evenement', {
    idevenement: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`CONCAT('Event ',nextval('seq_evenement'))`),
    },
    idutilisateur: {
        type: DataTypes.STRING,
        references: {
            model: 'utilisateur',
            key: 'idutilisateur',
        },
        allowNull: false,
    },
    nomevenement: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
    },
    descrievenement: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imgevenement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estvalide: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
},{
    tableName: 'evenement',
    timestamps: false
});

module.exports = { Event, evenement }