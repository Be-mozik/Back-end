const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { demande } = require('../../models/demande/Demande');

class DemandeController{

    async getAllDemande(req,res){
        try {
            const demandes = await demande.findAll();
            res.json(demandes);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getDemandeById(req,res){
        try {
            const dem = await demande.findByPk(req.params.idDemande);
            res.json(dem);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async createDemande(req, res){
        try {
            const correct = req.body.mdp1 === req.body.mdp2;
            if(correct){
                const hashed = await bcrypt.hash(req.body.mdp1,10);
                const dem = await demande.create({
                    ...req.body,
                    mdpdemande: hashed
                });
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'loick6446@gmail.com',
                        pass: '4743290502Loick'
                    }
                });
                const mailOption = {
                    from: 'loick6446@gmail.com',
                    to: req.body.maildemande,
                    subject: 'Test',
                    text: `Bonjour,
                    
                    Votre demande a bien été envoyé` 
                };
                await transporter.sendMail(mailOption);
                res.status(204).json(dem);
            }else{
                res.status(400).send("Mot de passe incorrect !");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
    async deleteDemande(req,res){
        try {
            const dem = await demande.findByPk(req.params.idDemande);
            if(dem){
                await demande.destroy(dem);
                res.status(204).send();
            }else{
                res.status(404).send("Demande non trouvée");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new DemandeController();