const { evenement } = require('../models/event/event');
const cron = require('node-cron');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

function checkEvent (){
    cron.schedule('* * * * *', async () => {
        try {
            const dateheure = moment().tz('Asia/Baghdad').format('YYYY-MM-DD HH:mm:ss');
            const events = await evenement.findAll({
            where: {
                estvalide: true,
                dateheureevenement: {
                [Op.lt]: dateheure
                }
            }
            });
            for (const event of events) {
                event.estvalide = false;
                event.etat = "Passé"
                await event.save();
            }
        } catch (error) {
            console.error(error);
        }
    });
}

module.exports = { checkEvent }