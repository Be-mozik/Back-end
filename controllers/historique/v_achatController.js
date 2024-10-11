const v_achat = require("../../models/historique/v_achat");
const historique = require("../../models/historique/historique");

class V_AchatController{
    async checkBillet(req,res){
        try {
            const rep = await v_achat.findOne({
                where: {tokenachat : req.params.tokenachat},
                attributes: ['tokenachat','nomclient','prenomclient','nomevenement','nombillet','nombre','estvalide'],
            });
            if(!rep){
                return res.send({error: "Billet introuvable."});
            }
            if(!rep.estvalide){
                return res.send({error: "Billet non valide."})
            }
            res.status(200).json(rep);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async updateBillet(req,res){
        try {
            const rep = await historique.findOne({
                where: {tokenachat : req.params.tokenachat},
            });
            await rep.update({
                estvalide: false,
            });
            res.status(200).send({success: "Billet mis à jour."})
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new V_AchatController();