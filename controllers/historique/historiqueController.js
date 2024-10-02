const historique  = require("../../models/historique/historique");
const event = require('../event/evenementController');
const clt = require('../client/clientController');
const billet = require('../billet/billetController');
const ct = require('../../models/clients/clients');

class HistoriqueController {

    async createHistorique(req,res){
        try {
            const { idclient,idevenement,idbillet,nombre } = req.body;
            const client = await ct.findByPk(idclient);
            if(!client){
                return res.status(400).send({message: "Client introuvable."});
            }
            const valideEvent = await event.checkEvent(idevenement);
            const valideBillet = await billet.checkBillet(idbillet,nombre);
            console.log(valideBillet);
            if(!valideEvent || !valideBillet){
                return res.status(500).send({error: "Erreur lors de la transaction : l'événement est passé ou les billets sont épuisés."})
            }
            const montant = await billet.calculMontant(idbillet,nombre);
            // const histo = await historique.create({
            //     idclient,
            //     idevenement,
            //     idbillet,
            //     nombre,
            //     montant,
            // });
            res.status(200).send({success: `Transaction réussie. ${histo}`});
        } catch (error) {
            res.status(500).send("Tsy mety: "+error.message);
        }
    }
}

module.exports = new HistoriqueController();