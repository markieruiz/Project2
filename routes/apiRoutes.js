//TODO:
//1. Added more filters to filter api: sports, time, ?
//2. User Login
//3. Meetup Update
//4. ENV files
//NOT MVP:
//1. Comments
//2. Add to Calendar
//3. hhh

var db = require("../models");
var geolib = require("geolib");
var Sequelize = require("sequelize");

module.exports = function(app) {
  // Get all examples
  app.get("/", function(req, res) {
    // var location1 = { latitude: 30.267140, longitude: -97.743076 };
    // var location2 = { latitude: 30.278935, longitude: -97.736108 };
    // var distance = geolib.getDistance(location1, location2);
    // var miles = (distance * 0.000621371).toFixed(2);
    // res.json(miles + " miles");
  });

  app.put("/api/filter", function(req, res) {
    var sports = [];
    var todaytime = new Date();
    console.log(typeof(req.body["sports[]"])); 
    console.log(req.body["sports[]"].length);
    if (typeof(req.body["sports[]"]) != "undefined" && req.body["sports[]"].length> 0 && typeof(req.body["sports[]"]) === "object") {
      sports = req.body["sports[]"];
    } else if (typeof(req.body["sports[]"]) != "undefined" && req.body["sports[]"].length> 0 && typeof(req.body["sports[]"]) === "string") {
      sports.push(req.body["sports[]"]);
    }
    console.log(sports);
    db.Meetup.findAll({ where: { [Sequelize.Op.and]: [{ "sport": { [Sequelize.Op.in]: sports } }, { "starttime" : { [Sequelize.Op.gte]: todaytime } }] } })
    .then(function(locations) {
      var coords = req.body.location.split(",");  
      var location1 = {
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1])
      };
      var distanceArray = [];
      for (i in locations) {
        var location2 = {
          latitude: locations[i].latitude,
          longitude: locations[i].longitude
        };
        var distance = geolib.getDistance(location1, location2);
        var miles = (distance * 0.000621371).toFixed(2);
        if (miles <= req.body.distance) {
          distanceArray.push(locations[i]);
        }
      }
      res.json(distanceArray);
    });
  });

  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/meetup", function(req, res) {
    db.Meetup.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/user", function(req, res) {
    db.User.update(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/meetup/:id", function(req, res) {
    db.Meetup.update(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });



  // Delete an example by id
  app.delete("/api/meetup/:id", function(req, res) {
    db.Meetup.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
