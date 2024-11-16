const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { demande } = require('../../models/demande/demande');
const { utilisateur } =require('../../models/utilisateur/utilisateur');

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
          const { prenomdemande, maildemande, mdp1, mdp2 } = req.body;
          const user = await utilisateur.findOne({where: {mailutilisateur: maildemande}});
          if (user) {
            return res.status(400).json({ message: 'Utilisateur déjà existant.' });
        }
        const correct = mdp1 === mdp2;
        if (!correct) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
        }
          const hashed = await bcrypt.hash(mdp1, 10);
          const dem = await demande.create({
            ...req.body,
            mdpdemande: hashed
          });
          res.status(200).json({success:"Un email vous sera envoyé ! "});
        } catch (error) {
          console.log(error);
          res.status(400).send(error);
        }
    }
      
    
    async deleteDemande(req,res){
        try {
            const dem = await demande.findOne({where: {iddemande: req.params.idDemande}});
            if(dem){
              await transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                  console.log(err);
                  res.status(400).json({message :"Une erreur a été rencontrée, veuillez réessayer !"});
                }
                console.log('Email sent: ' + info.response);
              });
              await demande.destroy({
                    where: { iddemande: dem.iddemande }
                });                
                res.status(200).json({success: "Demande supprimée"});
            }else{
                res.status(400).send({message: "Demande non trouvée"});
            }
        } catch (error) {
            console.log('erreur '+error);
            res.status(400).send(error);
        }
    }
}

module.exports = new DemandeController();