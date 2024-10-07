const { DataTypes } = require("sequelize");
const { seque } = require("../../config/db");

const clientSummary = seque.define('clientSummary',{
    nb_client: {
        type: DataTypes.INTEGER,
    },
    increase:{
        type: DataTypes.FLOAT,
    }
},{
    tableName: 'client_summary',
    timestamps: false,
});

module.exports = clientSummary;