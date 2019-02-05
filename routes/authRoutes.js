var router = require('express').Router();
var db = require("../models");
var passport = require('passport');


// auth login 
router.get('/login', (req, res) => {
    res.render("index");
})

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    res.send("logging out")
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
})) 

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached callback URI')
})

module.exports = router;
