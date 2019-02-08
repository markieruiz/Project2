/* eslint-disable no-unused-vars */
var router = require("express").Router();
var db = require("../models");
var passport = require("passport");
var path = require("path");


function authCheck(req, res, next) {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    // if logged in
    next();
  }
}
// auth login
router.get("/login", function(req, res) {
  res.render("index");
});

// auth logout
router.get("/logout", function(req, res) {
  //handle with passport
  req.logout();
  res.redirect("example");
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
