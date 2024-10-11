const express = require('express');
const historiqueController = require('../../controllers/historique/historiqueController');
const v_achat = require("../../controllers/historique/v_achatController");

const router = express.Router();

router.post('/acheter',historiqueController.createHistorique);
router.get('/check/billet/:tokenachat',v_achat.checkBillet);
router.get('/:idclient',historiqueController.getAchatByClient);
router.put('/modifier/:tokenachat',v_achat.updateBillet);

module.exports = router;