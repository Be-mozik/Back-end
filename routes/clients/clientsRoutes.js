const express = require('express');
const clientsController = require('../../controllers/client/clientController');

const router = express.Router();

router.get('/',clientsController.getAllClient);
router.post('/ajouterClient',clientsController.createClientFormulaire);
router.post('/ajouterClientApi',clientsController.createClientApi);
router.get('/:idclient',clientsController.getClientById);

module.exports = router;