var router = require('express').Router();
var db = require("../models");
var passport = require('passport');

function authCheck (req, res, next) {
    if(!req.user) {
        //if user is not logged in
        res.redirect("/auth/login");
    } else {
        // if logged in
        next();
    }
}
// auth login 
router.get('/login', (req, res) => {
    res.render("index");
})

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect("example")
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
})) 

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user)
    res.send(`you are logged in! this is your profile, ${req.user.firstName} ${req.user.lastName}`)
})

module.exports = router;
