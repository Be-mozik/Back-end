// passport-config.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
require('dotenv').config();
const client = require("../models/clients/clients");
const moment = require('moment');
const jwt = require('jsonwebtoken');

// Configuration de la stratégie Google pour Passport
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function(accessToken, refreshToken, profile, callback) {
            try {
                // Recherche de l'utilisateur dans la base de données
                let user = await client.findOne({ where: {mailclient: profile.emails[0].value}});
                if (!user) {
                    user = await client.create({
                        mailclient: profile.emails[0].value,
                        nomclient: profile.name.givenName,
                        prenomclient: profile.name.familyName,
                        dateclient: moment().toDate(),
                    });
                }
                // Création du JWT
                const token = jwt.sign(
                    { idclient: user.idclient, nomclient: user.nomclient },
                    process.env.JWT_SECRET,
                    { expiresIn: '3h' }
                );
                callback(null, { user, token });
            } catch (err) {
                callback(err);
            }
        }
    )
);

// Sérialisation de l'utilisateur dans la session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Désérialisation de l'utilisateur depuis la session
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
