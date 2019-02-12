var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/findGame", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/findmore.html"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};
