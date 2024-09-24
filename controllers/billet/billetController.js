const { billet } = require("../../models/billet/billet");

class BilletController{
    async getAllBillet(req,res){
        try {
            const billets = await billet.findAll();
            res.status(200).json(billets);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getBilletById(req,res){
        try {
            const bt = await billet.findByPk(req.params.idbillet);
            res.status(200).json(bt); 
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getBilletByEventPostMan(req,res){
        try {
            const bt = await billet.findAll({where: {
                idevenement: req.params.idevenement
            }});
            res.status(200).json(bt);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async getBilletByEvent(idevenement){
        try {
            const bt = await billet.findOne({where: {
                idevenement: idevenement
            }});
            return bt;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteBillet(req,res){
        try {
            const bt = await billet.findByPk(req.params.idbillet);
            if(!bt){
                return res.status(400).send("Erreur");
            }
            await billet.destroy({
                where: {idbillet: req.params.idbillet}
            });
            res.status(200).send("mety");
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async updateBilletPostMan(req,res){
        try {
            const { idbillet, nombillet, tarifbillet } = req.body;
            const bt = await billet.findByPk(idbillet);
            if(!bt){
                return res.status(400).send({messge: "Billet inconnu."});
            }
            await bt.update({
                nombillet: nombillet,
                tarifbillet: tarifbillet
            });
            res.status(200).send("mety");
        } catch (error) {
            res.send(400).send(error);
        }
    }

    async updateBillet(idbillet, nombillet, tarifbillet){
        try {
            const bt = await billet.findByPk(idbillet);
            if(!bt){
                return res.status(400).send({messge: "Billet inconnu."});
            }
            await bt.update({
                nombillet: nombillet,
                tarifbillet: tarifbillet
            });
            return bt;
        } catch (error) {
            console.log(error);
        }
    }

    async createBillet(idevenement, nombillet, tarifbillet){
        try {
            const bt = await billet.create({
                idevenement: idevenement,
                nombillet: nombillet,
                tarifbillet: tarifbillet
            });
            return bt;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new BilletController();