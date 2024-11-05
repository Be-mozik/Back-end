const  DataTypes  = require('sequelize');
const { seque } = require('../../config/db');
const { v4: uuidv4 } = require('uuid');

const historique = seque.define('achat',{
    tokenachat: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    idclient: {
        type: DataTypes.STRING,
        references: {
            model: 'clients',
            key: 'idclient',
        },
        allowNull: false,
    },
    idevenement: {
        type: DataTypes.STRING,
        references: {
            model: 'evenement',
            key: 'idevenement',
        },
        allowNull: false,
    },
    idbillet: {
        type: DataTypes.STRING,
        references: {
            model: 'billetevenement',
            key: 'idbillet',         
        },
        allowNull: false,
    },
    nombre: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    montant: {
        type: DataTypes.NUMERIC(9,2),
        allowNull: false,
    },
    datetransaction: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estvalide: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
},{
    tableName: 'achat',
    timestamps: false,
});


module.exports = historique;