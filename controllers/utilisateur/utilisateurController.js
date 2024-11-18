const { demande } = require("../../models/demande/demande");
const path = require('path');
const { utilisateur } = require(path.join(__dirname, '../../models/utilisateur/utilisateur'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

class UtilisateurController {

    async getAllUtilisateur(req,res){
        try {
            const users = await utilisateur.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUtilisateurById(req,res){
        try {
            const user = await utilisateur.findByPk(req.params.idUtilisateur);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async createUtilisateur(req,res){
        try {
            const hashedmdp = await bcrypt.hash(req.body.mdputilisateur,10);
            const user = await utilisateur.create({
                ...req.body,
                mdputilisateur: hashedmdp
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteUtilisateur(req,res){
        try {
            const user = await utilisateur.findOne({where: {idutilisateur: req.params.idUtilisateur}});
            if(user){
                await utilisateur.destroy({ where: { idutilisateur: req.params.idUtilisateur } });
                res.status(200).send({success: `Accès supprimer pour ${user.prenomutilisateur}`});
            }else{
                res.status(404).send("L'utilisateur n'a pas été trouvé.");
            }
        } catch (error) {
            console.log('Erreur: '+error);
            res.status(400).send(error);
        }
    }

    async login(req,res){
        try {
            const { mail, pass } = req.body;
            const user = await utilisateur.findOne({ where: {mailutilisateur: mail}});
            if(!user){
                return res.status(404).json({message: `L'utilisateur n'a pas été trouvé.`});
            }
            // const correct = await bcrypt.compare(pass,user.mdputilisateur);
            // if(!correct){
            //     return res.status(401).json({message: 'Le mot de passe est incorrect.'});
            // }
            const JWT_SECRET= process.env.JWT_SECRET
            const token = jwt.sign({idutilisateur: user.idutilisateur, prenomutilisateur: user.prenomutilisateur, statususer: user.estsuperutilisateur}, JWT_SECRET, {expiresIn: '3h'});
            res.status(200).json({token});
        } catch (error) {
            console.log('Error: '+error);
            res.status(400).send(error);
        }
    }

    async logout(req,res){
        return res.status(200).json({message: "Déconnexion."});
    }

    async approuverDemande(req,res){
        try {
            const dem = await demande.findByPk(req.params.iddemande);
            if(dem){
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
                    to: dem.maildemande,
                    subject: `Approbation de votre demande`,
                    html: `<p>Bonjour <strong>${dem.prenomdemande}</strong>,</p>
                    <p>Nous avons le plaisir de vous informer que votre demande a été examinée et approuvée avec succès. Vous pouvez désormais accéder aux fonctionnalités et services concernés sans restriction.</p>
                    <p>N'hésitez pas à nous contacter si besoin.</p>
                    <p>Nous restons à votre disposition pour toute question ou assistance supplémentaire.</p>
                    <p>Cordialement,</p>
                    <p><strong>L'équipe Be Mozik</strong></p>
                    `
                  };
                  await transporter.sendMail(mailOption, (err, info) => {
                    if (err) {
                      console.log(err);
                      res.status(400).json({message :"Une erreur a été rencontrée, veuillez réessayer !"});
                    }
                    console.log('Email sent: ' + info.response);
                  });
                const user = await utilisateur.create({
                    prenomutilisateur: dem.prenomdemande,
                    mailutilisateur: dem.maildemande,
                    mdputilisateur: dem.mdpdemande
                });
                await demande.destroy({
                    where: { iddemande: dem.iddemande }
                });
                res.status(200).json({success: `Accès autorisé pour ${user.prenomutilisateur}.`});
            }else{
                res.status(400).send({message: "Demande non trouvée."});
            }            
        } catch (error) {
            
        }
    }
}

module.exports = new UtilisateurController();