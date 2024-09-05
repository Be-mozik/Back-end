const express = require('express');
const demandeController = require('../../controllers/demande/demandeController');

const router = express.Router();

router.get('/',demandeController.getAllDemande);
router.post('/envoyerDemande',demandeController.createDemande);
router.get('/:idDemande',demandeController.getDemandeById);
router.delete('/supprimer/:idDemande',demandeController.deleteDemande);

module.exports = router;