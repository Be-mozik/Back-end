const { evenement } = require("../../models/event/event");
const { utilisateur } = require("../../models/utilisateur/utilisateur");

class EventController{
    
    async getAllEvent(req,res){
        try {
            const events = await evenement.findAll();
            res.json(events);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getEventById(req,res){
        try {
            const event = await evenement.findByPk(req.params.idEvent);
            res.json(event);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createEvent(req,res){
        try {
            const { idutilisateur, nomevenement, dateheureevenement, lieuevenement, descrievenement,imgevenement } = req.body;
            const user = await utilisateur.findByPk(idutilisateur);
            if(!user){
                console.log('Erreur: ');
                return res.status(400).json({message: 'Erreur'});
            }
            const event = await evenement.create({
                idutilisateur: idutilisateur,
                nomevenement: nomevenement,
                dateheureevenement: dateheureevenement,
                lieuevenement: lieuevenement,
                descrievenement: descrievenement,
                imgevenement: imgevenement
            });
            res.status(200).send(event);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async updateEvent(req,res){
        try {
            const { idevenement,nomevenement,dateheureevenement,lieuevenement,descievenement,imgevenement } = req.body;
            const event = await evenement.findByPk(idevenement);
            if(!event){
                return res.status(400).send({message: 'Evenement inconnu'})
            }
            await event.update({
                nomevenement: nomevenement,
                dateheureevenement: dateheureevenement,
                lieuevenement: lieuevenement,
                descievenement: descievenement,
                imgevenement: imgevenement
            });
            res.status(200).send({success: `Evenement ${event.nomevenement} modifié.`});
        } catch (error) {
            res.status(500).send({message: 'Erreur lors de la mise à jour de l\'événement'});
        }
    }

    async deleteEvenement(req,res){
        try {
            const event = await evenement.findByPk(req.params.idEvent);
            if(!event){
                return res.status(404).send({message: "Evenement inconnu."});
            }
            await evenement.destroy({
                where: {idevenement: event.idevenement}
            });
            res.status(200).send({success: 'Evenement supprimé'});
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new EventController();