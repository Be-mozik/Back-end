const express = require("express");
require('dotenv').config();
const {seque,connect} = require("./config/db");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const utilisateur = require("./routes/utilisateur/utilisateurRoutes");
const demande = require("./routes/demande/demandeRoutes");
const event = require('./routes/event/eventRoutes');
const info = require('./routes/infoline/infolineRoutes');
const billet = require('./routes/billet/billetRoutes');
const client = require('./routes/clients/clientsRoutes');
const historique = require('./routes/historique/historiqueRoutes');
const clientS = require('./routes/clients/clientSummaryRoutes');
const caS = require("./routes/historique/caSummaryRoutes");
const eventS = require("./routes/event/eventSummaryRoutes");
const achatS = require("./routes/historique/achatSummaryRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT;

app.use('/api/utilisateur',utilisateur);
app.use('/api/demande',demande);
app.use('/api/event',event);
app.use('/api/info',info);
app.use('/api/billet',billet);
app.use('/api/client',client);
app.use('/api/historique',historique);
app.use('/api/clientS',clientS);
app.use('/api/ca',caS);
app.use('/api/eventS',eventS);
app.use('/api/achatS',achatS);

connect();
seque.sync().then(() =>{
    app.listen(port, ()=>{
        console.log(`Application demarré sur le port: ${port}`);
    })
}).catch((error)=>{
    console.log('Erreur lors du demarage: ',error);
});