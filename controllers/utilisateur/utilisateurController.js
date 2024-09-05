const { utilisateur } = require("../../models/utilisateur/utilisateur");
const bcrypt = require('bcrypt');

class UtilisateurController {

    async getAllUtilisateur(req,res){
        try {
            const users = await utilisateur.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUtilisateurById(req,res){
        try {
            const user = await utilisateur.findByPk(req.params.idUtilisateur);
            res.json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async createUtilisateur(req,res){
        try {
            const hashedmdp = await bcrypt.hash(req.body.mdpUtilisateur,10);
            const user = await utilisateur.create({
                ...req.body,
                mdpUtilisateur: hashedmdp
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteUtilisateur(req,res){
        try {
            const idUser = req.params.idUtilisateur;
            await utilisateur.destroy({where: { idutilisateur: idUser }});
            res.status(204).send()
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new UtilisateurController();