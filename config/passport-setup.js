var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var keys = require("./keys");

passport.use(
    new GoogleStrategy({
    //options for the google strategy
        callbackURL: '/auth/login',
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
}, () => {
    //passport callback function
    })
)

