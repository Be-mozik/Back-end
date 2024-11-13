const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport");
require('dotenv').config();
const client = require("../models/clients/clients");
const moment = require('moment');
const jwt = require('jsonwebtoken');

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
                let user = await client.findOne({ where: {mailclient: profile.emails[0].value}});
                if (!user) {
                    user = await client.create({
                        mailclient: profile.emails[0].value,
                        nomclient: profile.name.givenName,
                        prenomclient: profile.name.familyName,
                        dateclient: moment().toDate(),
                    });
                }
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

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_KEY,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name']
    },
    async function(accessToken, refreshToken, profile, callback) {
        try {
        const email = profile.emails ? profile.emails[0].value : null;
        if (!email) {
            return callback(new Error('Email not found in Facebook profile'));
        }
        let user = await client.findOne({ where: { mailclient: email } });
        if (!user) {
            user = await client.create({
            mailclient: email,
            nomclient: profile.name.givenName,
            prenomclient: profile.name.familyName,
            dateclient: moment().toDate()
            });
        }
        const token = jwt.sign(
            { idclient: user.idclient, nomclient: user.nomclient },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );
        callback(null, { user, token });
        } catch (err) {
        callback(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


module.exports = passport;
