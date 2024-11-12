const { evenement } = require('../models/event/event');
const cron = require('node-cron');
const { Op } = require('sequelize');
const moment = require('moment-timezone');
const eventEtat = require('../models/eventEtat/eventEtat');

function checkEvent() {
    cron.schedule('* * * * *', async () => {
        try {
            const currentTime = moment().tz('Asia/Baghdad').toDate();
            const events = await evenement.findAll({
                where: {
                    estvalide: true,
                    dateheureevenement: {
                        [Op.lt]: currentTime 
                    }
                }
            });
            const updatePromises = events.map(async (event) => {
                event.estvalide = false;
                await event.save();
                const etat = await eventEtat.findOne({
                    where: { idevenement: event.idevenement }
                });
                if (etat) {
                    await etat.update({ idetat: 3 });
                }
            });
            await Promise.all(updatePromises);
        } catch (error) {
            console.error('Erreur dans le cron job checkEvent:', error);
        }
    });
}

module.exports = { checkEvent };
