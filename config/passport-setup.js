var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("../models");


passport.use(
    new GoogleStrategy({
    //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    console.log("passport callback fired");
    console.log(profile.name.givenName, profile.name.familyName);
    db.User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        googleID: profile.id
    }).then(function(newUser) {
        console.log(newUser);
    })
    })
)
