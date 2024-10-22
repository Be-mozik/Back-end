const devis = require("../../models/devis/Devis");


class DevisController {
    async getDevis(req,res){
        try {
            const ds = await devis.findAll();
            res.status(200).json(ds);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new DevisController();