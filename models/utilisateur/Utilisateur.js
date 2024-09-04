const { Sequilize,DataTypes } = require("sequelize");
const seq = require("../../config/db");

class Utilisateur{

    constructor(idUtilisateur, prenomUtilisateur, mailUtilisateur, mdpUtilisateur, estSuperUtilisateur,depuisUtilisateur){
        this.idUtilisateur = idUtilisateur;
        this.prenomUtilisateur = prenomUtilisateur;
        this.mailUtilisateur = mailUtilisateur;
        this.mdpUtilisateur = mdpUtilisateur;
        this.estSuperUtilisateur = estSuperUtilisateur;
        this.depuisUtilisateur = depuisUtilisateur;
    }

    getUtilisateur(){
        return `${this.idUtilisateur}
                ${this.prenomUtilisateur}
                ${this.mailUtilisateur}
                ${this.mdpUtilisateur}
                ${this.estSuperUtilisateur}
                ${this.depuisUtilisateur}`;
    }

}

const utilisateurModel = seq.define('utilisateur',{
    idUtilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
        primayKey: true,
        defaultValue: seq.literal(`CONCAT('Utilisateur ',nextval('seq_util'))`),
    },
    prenomUtilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mailUtilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdpUtilisateur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estSuperUtilisateur: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    depuisUtilisateur: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: seq.literal('CURRENT_DATE'),
    },
},{
    tableName: 'utilisateur',
    timestamps: false
});

module.exports = { Utilisateur,utilisateurModel }


