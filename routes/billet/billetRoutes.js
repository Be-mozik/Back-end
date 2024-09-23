const express = require("express");
const billetController = require("../../controllers/billet/billetController");

const router = express.Router();

router.get('/',billetController.getAllBillet);
router.get('/:idbillet',billetController.getBilletById);
router.get('/event/:idevenement',billetController.getBilletByEvent);
router.delete('/supprimer/:idbillet',billetController.deleteBillet);
router.put('/modifier',billetController.updateBillet);
router.post('/creerBillet',billetController.createBillet);

module.exports = router;