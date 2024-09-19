const { Sequelize, DataTypes } = require("sequelize");
const { seque } = require('../../config/db');

class Infoline{
    constructor(idEvenement, idInfo,info){
        this.idEvenement = idEvenement;
        this.idInfo = idInfo;
        this.info = info;
    }

    getInfoline(){
        return `${this.idEvenement}
                ${this.idInfo}
                ${this.info}`
    }

}

const infoline = seque.define('infoline',{
    idevenement: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'evenement',
            key: 'idevenement'
        }
    },
    idinfo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal(`CONCAT('Info ',nextval('seq_info'))`),
    },
    numeroinfo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: "infoevenement",
    timestamps: false
});

module.exports = { Infoline, infoline }