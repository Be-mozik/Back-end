const { evenement } = require('../models/event/event');
const cron = require('node-cron');
const { Op } = require('sequelize');

function checkEvent (){
    cron.schedule('* * * * *', async () => {
        try {
            let currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 3);
            const events = await evenement.findAll({
            where: {
                estvalide: true,
                dateheureevenement: {
                [Op.lt]: currentDate
                }
            }
            });
                for (const event of events) {
                    event.estvalide = false;
                    await event.save();
            }
        } catch (error) {
            console.error(error);
        }
    });
}

module.exports = { checkEvent }