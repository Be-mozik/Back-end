const { Sequelize, DataTypes } = require("sequelize");
const {seque} = require('../../config/db');

class Utilisateur {

    constructor(idUtilisateur, prenomUtilisateur, mailUtilisateur, mdpUtilisateur, estSuperUtilisateur, depuisUtilisateur) {
        this.idUtilisateur = idUtilisateur;
        this.prenomUtilisateur = prenomUtilisateur;
        this.mailUtilisateur = mailUtilisateur;
        this.mdpUtilisateur = mdpUtilisateur;
        this.estSuperUtilisateur = estSuperUtilisateur;
        this.depuisUtilisateur = depuisUtilisateur;
    }

    getUtilisateur() {
        return `${this.idUtilisateur}
                ${this.prenomUtilisateur}
                ${this.mailUtilisateur}
                ${this.mdpUtilisateur}
                ${this.estSuperUtilisateur}
                ${this.depuisUtilisateur}`;
    }
}

const utilisateur = seque.define('utilisateur', {
    idutilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`CONCAT('Utilisateur ',nextval('seq_util'))`),
    },
    prenomutilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailutilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdputilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estsuperutilisateur: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    depuisutilisateur: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
    },
}, {
    tableName: 'utilisateur',
    timestamps: false
});

module.exports = { Utilisateur, utilisateur };
