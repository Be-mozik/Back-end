const express = require("express");
const utilisateurController = require("../../controllers/utilisateur/utilisateurController");
const verifyToken = require("../../services/verifyToken");

const router = express.Router();

router.get('/', utilisateurController.getAllUtilisateur);
router.post('/ajouterUtilisateur', utilisateurController.createUtilisateur);
router.get('/:idUtilisateur', utilisateurController.getUtilisateurById);
router.delete('/supprimer/:idUtilisateur', utilisateurController.deleteUtilisateur);
router.post('/connexion', utilisateurController.login);
router.post('/deconnexion',utilisateurController.logout);
router.get('/approuver/:iddemande',verifyToken,utilisateurController.approuverDemande);

module.exports = router;
