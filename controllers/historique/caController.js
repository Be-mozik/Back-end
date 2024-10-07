const ca = require("../../models/historique/ca");

class CaController {
    async getCaSummary(req,res){
        try {
            const c = await ca.findOne({
                attributes: ['montant','augmentation'],
            });
            res.status(200).json(c);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new CaController();