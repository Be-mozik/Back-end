const express = require('express');
const DevisController = require("../../controllers/devis/devisController");

const router = express.Router();

router.get('/',DevisController.getDevis);

module.exports = router;