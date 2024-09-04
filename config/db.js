const { Sequilize } = require('sequelize');

const seq = new Sequilize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS{
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const connect = async () => {
    try {
        await seq.authenticate();
        console.log('Connecter sur '+ sequelize.getDatabaseName());
    } catch (error) {
        console.error("Erreur ",error)
    }
};

module.exports = {seq,connect};