const { Sequelize, DataTypes } = require("sequelize");
const { seque } = require('../../config/db');

class Demande{

    constructor(idDemande,prenomDemande,mailDemande,mdpDemande,dateDemande){
        this.idDemande = idDemande;
        this.prenomDemande = prenomDemande;
        this.mailDemande = mailDemande;
        this.mdpDemande = mdpDemande;
        this.dateDemande = dateDemande;
    }

    getDemande(){
        return `${this.idDemande}
                ${this.prenomDemande}
                ${this.mailDemande}
                ${this.mdpDemande}
                ${this.dateDemande}`;
    }
}

const demande = seque.define('demande',{
    iddemande: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`CONCAT('Demande ',nextval('seq_demande'))`),
    },
    prenomdemande: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    maildemande: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdpdemande: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    datedemande: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_DATE'),
    },
}, {
    tableName: 'demande',
    timestamps: false
});

module.exports = { Demande, demande }