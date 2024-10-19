const statByEvent = require("../../models/event/statByEvent");
const statBilletEvent = require("../../models/event/statByEventBillet");

class StatByEvent {

    async getStatByEvent(req,res){
        try {
            const stat = await statByEvent.findOne({
                where: {idevenement: req.params.idevenement}
            });
            res.status(200).json(stat);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getStatBilletEvent(req,res){
        try {
            const stat = await statBilletEvent.findAll({
                where: {idevenement: req.params.idevenement}
            });
            res.status(200).json(stat);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new StatByEvent();