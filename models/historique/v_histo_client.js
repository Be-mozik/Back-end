const { DataTypes } = require("sequelize");
const { seque } = require("../../config/db");

const v_histo_client = seque.define('v_historique_client,',{
    idclient: {
        type: DataTypes.STRING,
    },
    idevenement: {
        type: DataTypes.STRING,
    },
    nomevenement: {
        type: DataTypes.STRING,
    },
    idbillet: {
        type: DataTypes.STRING,
    },
    nombillet: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.INTEGER,
    },
    montant: {
        type: DataTypes.FLOAT,
    },
    nomdevis: {
        type: DataTypes.STRING,
    },
    datetransaction: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    tableName: 'v_historique_client',
    timestamps: false,
});

module.exports = v_histo_client;
