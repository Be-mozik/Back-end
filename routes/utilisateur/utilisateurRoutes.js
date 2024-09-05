const express = require("express");
const utilisateurController = require("../../controllers/utilisateur/utilisateurController");

const router = express.Router();

router.get('/utilisateur/', utilisateurController.getAllUtilisateur);
router.post('/', utilisateurController.createUtilisateur);
router.get('/utilisateur/:idUtilisateur', utilisateurController.getUtilisateurById);
router.delete('/utilisateur/:idUtilisateur', utilisateurController.deleteUtilisateur);

module.exports = router;
