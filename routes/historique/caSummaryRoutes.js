const express = require("express");
const ca = require("../../controllers/historique/caController");
const statByEvent = require("../../controllers/event/statByEventController");

const router = express.Router();

router.get('/',ca.getCaSummary);
router.get('/stat/:idevenement',statByEvent.getStatByEvent);
router.get('/stat/billet/:idevenement',statByEvent.getStatBilletEvent);

module.exports = router;