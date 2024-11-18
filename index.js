const express = require("express");
require('dotenv').config();
const {seque,connect} = require("./config/db");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { checkEvent } = require('./services/checkEvent');
const passport = require("passport");
const expressSession = require("express-session");

const utilisateur = require("./routes/utilisateur/utilisateurRoutes");
const demande = require("./routes/demande/demandeRoutes");
const event = require('./routes/event/eventRoutes');
const devis = require('./routes/devis/devisRoutes');
const info = require('./routes/infoline/infolineRoutes');
const billet = require('./routes/billet/billetRoutes');
const client = require('./routes/clients/clientsRoutes');
const historique = require('./routes/historique/historiqueRoutes');
const clientS = require('./routes/clients/clientSummaryRoutes');
const caS = require("./routes/historique/caSummaryRoutes");
const eventS = require("./routes/event/eventSummaryRoutes");
const achatS = require("./routes/historique/achatSummaryRoutes");
const authGoogle = require("./routes/auth");

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://10.0.2.2:5000',
      'https://dapper-hummingbird-c838d9.netlify.app',
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/utilisateur',utilisateur);
app.use('/api/demande',demande);
app.use('/api/event',event);
app.use('/api/devis',devis);
app.use('/api/info',info);
app.use('/api/billet',billet);
app.use('/api/client',client);
app.use('/api/achat',historique);
app.use('/api/clientS',clientS);
app.use('/api/ca',caS);
app.use('/api/eventS',eventS);
app.use('/api/achatS',achatS);
app.use('/auth',authGoogle);

const port = process.env.PORT;

connect();
seque.sync().then(() =>{
    app.listen(port, ()=>{
        console.log(`Application demarré sur le port: ${port}`);
    })
}).catch((error)=>{
    console.log('Erreur lors du demarage: ',error);
});

checkEvent();