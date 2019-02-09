var router = require("express").Router();
// var db = require("../models");
var passport = require("passport");
// var path = require("path");
// var cookieSession = require("cookie-session");

function authCheck(req, res, next) {
  if (!req.user) {
    //if user is not logged in
    res.send("You must log in to play GAME-IT-UP!");
  } else {
    // if logged in
    next();
  }
}

// auth login
router.get("/login", authCheck, function(req, res) {
  res.render("index");
});

router.get("/findgame", authCheck, function(req, res) {
  res.redirect("/findGame");
});

router.get("/creategame", authCheck, function(req, res) {
  res.redirect("/create");
});

// auth logout
router.get("/logout", function(req, res) {
  //handle with passport
  console.log("logging out");
  req.logout();
  req.session = null;
  res.redirect("/");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), function(
  req,
  res
) {
  // res.send(req.user)
  res.redirect("/");
});

module.exports = router;
