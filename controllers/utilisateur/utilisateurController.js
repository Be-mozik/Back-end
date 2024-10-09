const { demande } = require("../../models/demande/Demande");
const { utilisateur } = require("../../models/utilisateur/utilisateur");
const bcrypt = require('bcrypt');
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
                res.status(404).send("Utilisateur non trouvé");
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
                return res.json({message: 'Utilisateur non trouve'});
            }
            const correct = await bcrypt.compare(pass,user.mdputilisateur);
            if(!correct){
                return res.json({message: 'Mot de passe incorrect'});
            }
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
                // const transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //       auth: {
                //           user: process.env.EMAIL_USER,
                //           pass: process.env.APP_PASS,
                //       },
                //       tls: {
                //         rejectUnauthorized: false
                //       }
                //   });
            
                //   const mailOption = {
                //     from: {
                //       name: 'Be mozik',
                //       address: process.env.EMAIL_USER
                //   },
                //     to: dem.maildemande,
                //     subject: 'Demande approuvée',
                //     text: `Bonjour,
                    
                //     Votre demande a bien été approuvée
                //     ${dem.prenomdemande}`
                //   };
            
                //   await transporter.sendMail(mailOption, (err, info) => {
                //     if (err) {
                //       console.log(err);
                //       res.status(400).json({message :"Une erreur a été rencontrée, veuillez réessayer !"});
                //     }
                //     console.log('Email sent: ' + info.response);
                //   });

                const user = await utilisateur.create({
                    prenomutilisateur: dem.prenomdemande,
                    mailutilisateur: dem.maildemande,
                    mdputilisateur: dem.mdpdemande
                });
                await demande.destroy({
                    where: { iddemande: dem.iddemande }
                });
                res.status(200).json({success: `Accès autorisé pour ${user.prenomutilisateur}`});
            }else{
                res.status(400).send({message: "Demande non trouvée"});
            }            
        } catch (error) {
            
        }
    }
}

module.exports = new UtilisateurController();