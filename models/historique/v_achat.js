const { DataTypes } = require("sequelize");
const { seque } = require("../../config/db");

const v_achat = seque.define('v_achat',{
    tokenachat: {
        type: DataTypes.STRING,
    },
    nomclient: {
        type: DataTypes.STRING,
    },
    prenomclient: {
        type: DataTypes.STRING,
    },
    nomevenement: {
        type: DataTypes.STRING,
    },
    nombillet: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.INTEGER,
    },
    estvalide: {
        type: DataTypes.BOOLEAN,
    }
},{
    tableName: "v_achat",
    timestamps: false,
});

module.exports = v_achat;