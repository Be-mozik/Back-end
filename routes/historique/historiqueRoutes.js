const express = require('express');
const historiqueController = require('../../controllers/historique/historiqueController');
const v_achat = require("../../controllers/historique/v_achatController");
const verifyToken = require("../../services/verifyToken");
const router = express.Router();

router.post('/acheter',verifyToken,historiqueController.achatBillet);
router.get('/check/billet/:tokenachat',verifyToken,v_achat.checkBillet);
router.get('/:idclient',historiqueController.getAchatByClient);
router.put('/modifier/:tokenachat',verifyToken,v_achat.updateBillet);

module.exports = router;