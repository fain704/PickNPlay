//dependencies
var path = require('path');

//routes
module.exports = function(app) {

  //index
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index"));
  });


  //login
  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login"));
  });


  //scoreboard
  app.get('/scoreboard', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/scoreboard"));
  });


  //portfolio
  app.get('/portfolio', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/portfolio"));
  });

};