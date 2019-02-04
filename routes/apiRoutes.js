//TODO:
//Done1. Added more filters to filter api: sports, time
//2. User Login
//DONE3. Meetup Update
//4.DONE ENV files
//NOT MVP:
//1. Comments
//2. Add to Calendar
//3. hhh

var db = require("../models");
var geolib = require("geolib");
var Sequelize = require("sequelize");

module.exports = function(app) {
 
  // app.get("/", function(req, res) {
  //   var location1 = { latitude: 30.267140, longitude: -97.743076 };
  //   var location2 = { latitude: 30.278935, longitude: -97.736108 };
  //   var distance = geolib.getDistance(location1, location2);
  //   var miles = (distance * 0.000621371).toFixed(2);
  //   res.json(miles + " miles");
  // });

  app.put("/api/filter", function(req, res) {
    var sports = [];
    var starttime = new Date();
    var endtime = req.body.endtime;
    //checks if incoming sports is an array, string, or undefined and sorts it accordingly
    if (typeof(req.body["sports[]"]) != "undefined" && req.body["sports[]"].length> 0 && typeof(req.body["sports[]"]) === "object") {
      sports = req.body["sports[]"];
    } else if (typeof(req.body["sports[]"]) != "undefined" && req.body["sports[]"].length> 0 && typeof(req.body["sports[]"]) === "string") {
      sports.push(req.body["sports[]"]);
    }
    //Calls the Sequelize FindAll function on the Meetup table with the search filters (sports, window of time) given by the incoming data
    db.Meetup.findAll({ where: { [Sequelize.Op.and]: [{ "sport": { [Sequelize.Op.in]: sports } }, { "starttime" : { [Sequelize.Op.gte]: starttime } }, { "starttime" : { [Sequelize.Op.lte]: endtime } }] } })
    //
    .then(function(locations) {
      //Splits the string recieved from data into two integers, longitude and lattitude
      var coords = req.body.location.split(",");  
      var location1 = {
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1])
      };
      var distanceArray = [];
      //Iterates through all items from SQL query and filters them by distance from value recieved from data
      for (i in locations) {
        var location2 = {
          latitude: locations[i].latitude,
          longitude: locations[i].longitude
        };
        //Calls the geolib npm to get distance between two places using longitude and latitude
        var distance = geolib.getDistance(location1, location2);
        //Converts output (given in meters) to miles
        var miles = (distance * 0.000621371);
        //If location is within the required distance it is added to an array 
        var counter = 1;
        if (miles <= req.body.distance) {
          distanceArray.push(locations[i]);
        }
      }
      //returns an array of objects that meet all filter requirements
      res.json(distanceArray);
    });
  });

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

  app.put("/api/meetup", function(req, res) {
    db.Meetup.update(
      {
        title: req.body.title,
        description: req.body.description,
        sport: req.body.sport,
        starttime: req.body.starttime,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      }, {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/user", function(req, res) {
    db.Meetup.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }, {
        where: {
          id: req.body.id
        }
      }
    ).then(function(results) {
      res.json(results);
    });
  });

  // Delete an example by id
  app.delete("/api/meetup/:id", function(req, res) {
    db.Meetup.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
