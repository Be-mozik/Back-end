const { util } = require("../../models/utilisateur/utilisateur");

class UtilisateurController {

    async getAllUtilisateur(req,res){
        try {
            const users = await util.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUtilisateurById(req,res){
        try {
            const user = await util.findByPk(req.params.idUtilisateur);
            res.json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async createUtilisateur(req,res){
        try {
            const user = await util.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    async deleteUtilisateur(req,res){
        try {
            const idUser = req.params.idUtilisateur;
            await util.destroy({where: { idutilisateur: idUser }});
            res.status(204).send()
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = new UtilisateurController();