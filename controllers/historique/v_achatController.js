const v_achat = require("../../models/historique/v_achat");

class V_AchatController{
    async checkBillet(req,res){
        try {
            const rep = await v_achat.findOne({
                where: {tokenachat : req.params.tokenachat},
                attributes: ['tokenachat','nomclient','prenomclient','nomevenement','nombillet','nombre','estvalide'],
            });
            if(!rep){
                return res.send({error: "Billet non valide ou introuvable."});
            }
            res.status(200).json(rep);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new V_AchatController();