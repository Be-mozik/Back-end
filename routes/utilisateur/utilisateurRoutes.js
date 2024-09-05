const express = require("express");
const utilisateurController = require("../../controllers/utilisateur/utilisateurController");

const router = express.Router();

router.get('/', utilisateurController.getAllUtilisateur);
router.post('/ajouterUtilisateur', utilisateurController.createUtilisateur);
router.get('/:idUtilisateur', utilisateurController.getUtilisateurById);
router.delete('/supprimer/:idUtilisateur', utilisateurController.deleteUtilisateur);

module.exports = router;
