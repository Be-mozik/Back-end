const { Sequelize } = require('sequelize');
require('dotenv').config();

const seque = new Sequelize(process.env.DB, {
    protocol: 'postgres',
    dialect: 'postgres',
});

const connect = async () => {
    try {
        await seque.authenticate();
        console.log('Connecter sur '+ seque.getDatabaseName());
    } catch (error) {
        console.error("Erreur ",error)
    }
};

module.exports = { seque, connect };