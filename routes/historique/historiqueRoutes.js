const express = require('express');
const historiqueController = require('../../controllers/historique/historiqueController');

const router = express.Router();

router.post('/acheter',historiqueController.createHistorique);
router.get('/:idclient',historiqueController.getAchatByClient);

module.exports = router;