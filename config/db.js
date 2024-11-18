const { Sequelize } = require('sequelize');
require('dotenv').config();

// const seque = new Sequelize(process.env.DB, {
//     protocol: 'postgres',
//     dialect: 'postgres',
// });

const seque = new Sequelize(process.env.DB_NAME,
                                 process.env.DB_USER,
                                 process.env.DB_PASS,
                                  { 
                                    host: process.env.DB_HOST,
                                    dialect: 'postgres',
                                     protocol: 'postgres'
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