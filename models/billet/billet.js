const { Sequelize, DataTypes } = require("sequelize");
const { seque } = require("../../config/db");

class Billet{
    constructor(idEvenement,idBillet,nomBillet,tarifBillet){
        this.idEvenement = idEvenement;
        this.idBillet = idBillet;
        this.nomBillet = nomBillet;
        this.tarifBillet = tarifBillet;
    }

    getBillet(){
        return `${this.idEvenement}
                ${this.idBillet}
                ${this.nomBillet}
                ${this.tarifBillet}`
    }
}

const billet = seque.define('billetEvenement',{
    idevenement: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'evenement',
            key: 'idevenement'
        }
    },
    idbillet: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`CONCAT('Billet ',nextval('seq_billet'))`),
    },
    nombillet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tarifbillet: {
        type: DataTypes.NUMERIC(9,2),
        allowNull: false,
    }
},{
    tableName: "billetEvenement",
    timestamps: false
});

module.exports = { Billet, billet }