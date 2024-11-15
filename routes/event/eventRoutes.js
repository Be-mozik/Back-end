const express = require('express');
const eventController = require('../../controllers/event/evenementController');
const verifyToken = require('../../services/verifyToken');
const router = express.Router();

router.get('/',eventController.getAllEvent);
router.get('/evenement',eventController.getEventValide);
router.get('/:idEvent',eventController.getEventById);
router.post('/creerEvent',verifyToken,eventController.createEvent);
router.put('/modifier',verifyToken,eventController.updateEvent);
router.delete('/supprimer/:idEvent',eventController.deleteEvenement);
router.put('/annuler/:idEvent',verifyToken,eventController.annulerEvent);

module.exports = router;    