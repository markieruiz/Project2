var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");
var db = require("../models");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findOne({ where: { id: id } }).then(function(user) {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.clientID,
      clientSecret: keys.clientSecret
    },
    function(accessToken, refreshToken, profile, done) {
      //check if User already exists in our database
      db.User.findOne({ where: { googleID: profile.id } }).then(function(
        currentUser
      ) {
        if (currentUser) {
          //already have user
          console.log("user is ", currentUser);
          done(null, currentUser);
        } else {
          //if not, create new user in db
          db.User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            googleID: profile.id
          }).then(function(newUser) {
            console.log(newUser);
            done(null, newUser);
          });
        }
      });
    }
  )
);
