const express = require("express");
const ca = require("../../controllers/historique/caController");

const router = express.Router();

router.get('/',ca.getCaSummary);

module.exports = router;