const { DataTypes } = require("sequelize");
const { seque } = require("../../config/db");

const devis = seque.define('devis',{
    iddevis: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nomdevis: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'devis',
    timestamps: false,
});

module.exports = devis;