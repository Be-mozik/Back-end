const { Sequelize } = require('sequelize');

const seque = new Sequelize('Mozik', 'Be', '123', {
    host: 'localhost',
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

module.exports = {seque,connect};