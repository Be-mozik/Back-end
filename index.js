const express = require("express");
require('dotenv').config();
const {seque,connect} = require("./config/db");
const cors = require('cors');
const bodyParser = require('body-parser');

const utilisateur = require("./routes/utilisateur/utilisateurRoutes");
const demande = require("./routes/demande/demandeRoutes");
const event = require('./routes/event/eventRoutes');
const info = require('./routes/infoline/infolineRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use('/api/utilisateur',utilisateur);
app.use('/api/demande',demande);
app.use('/api/event',event);
app.use('/api/info',info);

connect();
seque.sync().then(() =>{
    app.listen(port, ()=>{
        console.log(`Application demarré sur le port: ${port}`);
    })
}).catch((error)=>{
    console.log('Erreur lors du demarage: ',error);
});