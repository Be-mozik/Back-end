const express = require('express');
const eventController = require('../../controllers/event/evenementController');

const router = express.Router();

router.get('/',eventController.getAllEvent);
router.get('/:idEvent',eventController.getEventById);
router.post('/creerEvent',eventController.createEvent);
router.put('/modifier',eventController.updateEvent);
router.delete('/supprimer/:idEvent',eventController.deleteEvenement);
router.put('/annuler/:idEvent',eventController.annulerEvent);

module.exports = router;