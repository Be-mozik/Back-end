const { DataTypes } = require("sequelize");
const {seque} = require("../../config/db");

const ca = seque.define('caSummary',{
    montant: {
        type: DataTypes.NUMERIC(9,2),
    },
    augmentation: {
        type: DataTypes.FLOAT,
    }
},{
    tableName:"ca_summary",
    timestamps: false,
});

module.exports = ca;