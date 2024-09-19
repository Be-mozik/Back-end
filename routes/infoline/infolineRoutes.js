const express = require('express');
const infolineController = require('../../controllers/infoline/infolineController');

const router = express.Router();

router.get('/',infolineController.getAllInfo);
router.get('/:idInfo',infolineController.getInfoById);
router.get('/event/:idevenement',infolineController.getInfoByEvent);
router.delete('/supprimer/:idinfo',infolineController.deleteInfo);
router.put('/modifier',infolineController.updateInfo);
router.post('/creerInfo',infolineController.createInfo);

module.exports = router;