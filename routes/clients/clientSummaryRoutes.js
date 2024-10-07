const express = require('express');
const clientSC = require("../../controllers/client/clientSummaryController");

const router = express.Router();

router.get('/',clientSC.getClientSummary);

module.exports = router;