const { where } = require("sequelize");
const { billet } = require("../../models/billet/billet");
const historique = require("../../models/historique/historique");
require('dotenv').config();
const axios = require('axios');

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

    async deleteBilletByEvent(idEvent){
        try {
            await billet.destroy({
                where: {idevenement: idEvent}
            });
            return { success: true, message: "Information supprimée avec succès." };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async updateBilletPostMan(req,res){
        try {
            const { idbillet, nombillet, tarifbillet, nombrebillet } = req.body;
            const bt = await billet.findByPk(idbillet);
            if(!bt){
                return res.status(400).send({messge: "Billet inconnu."});
            }
            await bt.update({
                nombillet: nombillet,
                tarifbillet: tarifbillet,
                nombrebillet: nombrebillet
            });
            res.status(200).send("mety");
        } catch (error) {
            res.send(400).send(error);
        }
    }

    async updateBillet(idbillet, nombillet, tarifbillet,nombrebillet){
        try {
            const bt = await billet.findByPk(idbillet);
            if(!bt){
                return res.status(400).send({messge: "Billet inconnu."});
            }
            await bt.update({
                nombillet: nombillet,
                tarifbillet: tarifbillet,
                nombrebillet: nombrebillet
            });
            return bt;
        } catch (error) {
            console.log(error);
        }
    }

    async createBillet(idevenement, nombillet, tarifbillet,iddevis,nombrebillet){
        try {
            const bt = await billet.create({
                idevenement: idevenement,
                nombillet: nombillet,
                tarifbillet: tarifbillet,
                iddevis: iddevis,
                nombrebillet: nombrebillet
            });
            return bt;
        } catch (error) {
            console.log(error);
        }
    }

    async checkBillet(idbillet, nombre) {
        try {
            const b = await billet.findByPk(idbillet);
            if (!b) {
                return false;
            }
            const venteDeCeBillet = await historique.sum('nombre', {where:{idbillet: idbillet}});
            const disponible = b.nombrebillet - venteDeCeBillet;
            return nombre <= disponible;
        } catch (error) {
            throw error;
        }
    }

    async checkBilletPostMan(req, res) {
        try {
            const b = await billet.findByPk(req.params.idbillet);
            if (!b) {
                return res.json({ success: false, message: "Le billet n'existe pas." });
            }
            const venteDeCeBillet = await historique.sum('nombre', { where: { idbillet: req.params.idbillet } });
            const disponible = b.nombrebillet - venteDeCeBillet;
            const isAvailable = req.body.nombre <= disponible;
            if (isAvailable) {
                return res.json({ success: true, available: true });
            } else {
                return res.json({
                    success: false,
                    available: false,
                    message: `Quantité insuffisante. Seulement ${disponible} billets disponibles.`
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Erreur du serveur' });
        }
    }
    

    async calculMontant(idbillet,nombre){
        try {
            const devis = process.env.DEVIS_KEY;
            const urlUS = `https://v6.exchangerate-api.com/v6/${devis}/latest/USD`;
            const urlEUR = `https://v6.exchangerate-api.com/v6/${devis}/latest/EUR`;
            const b = await billet.findByPk(idbillet);
            let montant = 0;

            if(b.iddevis == 1){
                const eur = await axios.get(urlEUR);
                montant = (nombre * b.tarifbillet) * eur.data.conversion_rates.MGA ;
            }else if(b.iddevis ==2){
                const us = await axios.get(urlUS);
                montant = (nombre * b.tarifbillet) *us.data.conversion_rates.MGA;
            }else{
                montant = nombre * b.tarifbillet;
            }
            return montant;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BilletController();