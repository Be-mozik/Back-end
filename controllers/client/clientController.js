const bcrypt = require('bcrypt');
const clients = require('../../models/clients/clients');

class ClientsController {

    async getAllClient(req,res){
        try {
            const clts = await clients.findAll();
            res.status(200).json(clts);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createClientFormulaire(req,res){
        try {
            const { nomclient, prenomclient,mailclient,mdp1,mdp2,dateclient } = req.body;
            const correct = mdp1 === mdp2;
            if(!correct){
                return res.status(500).send({message: "Les mots de passe ne correspondent pas."});
            }
            const hashed = await bcrypt.hash(mdp1,10);
            const clt = await clients.create({
                nomclient,
                prenomclient,
                mailclient,
                mdpclient: hashed,
                dateclient: dateclient,
            });
            res.status(200).send("Client enregistré: "+clt);
        } catch (error) {
            res.status(500).send("tsy mety: "+error);
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