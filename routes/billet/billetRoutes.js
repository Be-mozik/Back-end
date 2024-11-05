const express = require("express");
const billetController = require("../../controllers/billet/billetController");

const router = express.Router();

router.get('/',billetController.getAllBillet);
router.get('/:idbillet',billetController.getBilletById);
router.get('/event/:idevenement',billetController.getBilletByEventPostMan);
router.delete('/supprimer/:idbillet',billetController.deleteBillet);
router.put('/modifier',billetController.updateBilletPostMan);
router.post('/creerBillet',billetController.createBillet);
router.post('/check/:idbillet',billetController.checkBilletPostMan);

module.exports = router;