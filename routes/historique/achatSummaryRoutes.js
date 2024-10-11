const express = require("express");
const aS = require("../../controllers/historique/achatSummaryController");

const router = express.Router();

router.get('/',aS.getAchatSummary);
router.get('/get/Years',aS.getYears);
router.get('/:year',aS.getAchatSummaryGraph1);

module.exports = router;