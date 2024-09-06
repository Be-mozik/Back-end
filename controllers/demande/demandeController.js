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

    async createDemande(req, res) {
        try {
          const correct = req.body.mdp1 === req.body.mdp2;
          if (correct) {
            const hashed = await bcrypt.hash(req.body.mdp1, 10);
            const dem = await demande.create({
              ...req.body,
              mdpdemande: hashed
            });
            const transporter = nodemailer.createTransport({
              service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.APP_PASS,
                },
                tls: {
                  rejectUnauthorized: false
                }
            });
      
            const mailOption = {
              from: {
                name: 'Be mozik',
                address: process.env.EMAIL_USER
            },
              to: req.body.maildemande,
              subject: 'Test',
              text: `Bonjour,
              
              Votre demande a bien été envoyée
              ${req.body.prenomdemande}`
            };
      
            await transporter.sendMail(mailOption, (err, info) => {
              if (err) {
                console.log(err);
                return console.log(err);
              }
              console.log('Email sent: ' + info.response);
            });
      
            res.status(204).json(dem);
          } else {
            res.status(400).send("Mot de passe incorrect !");
          }
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
      }
    
    async deleteDemande(req,res){
        try {
            const dem = await demande.findOne({where: {iddemande: req.params.idDemande}});
            if(dem){
                await demande.destroy({
                    where: { iddemande: req.params.idDemande }
                });                
                res.status(204).send();
            }else{
                res.status(404).send("Demande non trouvée");
            }
        } catch (error) {
            console.log('erreur '+error);
            res.status(400).send(error);
        }
    }
}

module.exports = new DemandeController();