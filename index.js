const express = require("express");
require('dotenv').config();
const {seque,connect} = require("./config/db");
const utilisateur = require("./routes/utilisateur/utilisateurRoutes");
const demande = require("./routes/demande/demandeRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/utilisateur',utilisateur);
app.use('/api/demande',demande);
connect();
seque.sync().then(() =>{
    app.listen(port, ()=>{
        console.log(`Application demarré sur le port: ${port}`);
    })
}).catch((error)=>{
    console.log('Erreur lors du demarage: ',error);
});