const bcrypt = require('bcrypt');
const clients = require('../../models/clients/clients');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');

class ClientsController {

    async getAllClient(req,res){
        try {
            const clts = await clients.findAll();
            res.status(200).json(clts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createClientFormulaire(req, res) {
        try {
            const { nomclient, prenomclient, mailclient, mdp1, mdp2 } = req.body;
            const client = await clients.findOne({ where: { mailclient } });
            if (client) {
                return res.status(409).json({ message: 'Utilisateur déjà existant.' });
            }
            if (mdp1 !== mdp2) {
                return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
            }
            const date = moment().tz('Asia/Baghdad').format('YYYY-MM-DD');
            const hashed = await bcrypt.hash(mdp1, 10);
            const newClient = await clients.create({
                nomclient,
                prenomclient,
                mailclient,
                mdpclient: hashed,
                dateclient: date,
            });
            res.status(201).json({ message: "Client enregistré avec succès.", clientId: newClient.id });
        } catch (error) {
            console.error("Erreur lors de la création du client:", error);
            res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer plus tard.", error: error.message });
        }
    }

    async loginClient(req,res){
        try {
            const { mail, pass } = req.body;
            const client = await clients.findOne({ where: {mailclient: mail}});
            if(!client){
                return res.status(404).json({message: `L'utilisateur n'a pas été trouvé.`});
            }
            const correct = await bcrypt.compare(pass,client.mdpclient);
            if(!correct){
                return res.status(401).json({message: 'Le mot de passe est incorrect.'});
            }
            const JWT_SECRET= process.env.JWT_SECRET
            const token = jwt.sign({idclient: client.idclient, nomclient: client.nomclient}, JWT_SECRET, {expiresIn: '3h'});
            res.status(200).json({token});
        } catch (error) {
            console.log(error);
            
            res.status(500).send(error);
        }
    }

    async createClientApi(req,res){
        try {
            const { nomclient, prenomclient, mailclient } =req.body;
            const clt = await clients.create({
                nomclient,
                prenomclient,
                mailclient
            });
            res.status(200).json(clt);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getClientById(req,res){
        try {
            const client = await clients.findByPk(req.params.idclient);
            if(!client){
                return res.status(400).send({message: "Client inconnu."});
            }
            res.status(200).json(client);
        } catch (error) {
            res.status(404).send(error);
        }
    }


}

module.exports = new ClientsController();