const express = require("express");
const eS = require("../../controllers/event/eventSummaryController");

const router = express.Router();

router.get('/',eS.getEventSummary);
router.get('/get/year',eS.getYears);
router.get('/:year',eS.getStatEvent);

module.exports = router;