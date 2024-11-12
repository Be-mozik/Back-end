const express = require('express');
const passport = require("passport");
const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/Connexion' }),
  (req, res) => {
      res.redirect(`http://localhost:3000/Accueil?token=${req.user.token}`);
  }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/Connexion' }),
  (req, res) => {
    res.redirect(`http://localhost:3000/Accueil?token=${req.user.token}`);
});


module.exports = router;
