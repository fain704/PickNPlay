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

  // route for user logout
  app.get('/logout', (req, res) => {
      if (req.session.user && req.cookies.user_sid) {
          res.clearCookie('user_sid');
          res.redirect('/');
      } else {
          res.redirect('/login');
      }
  });

  // route for handling 404 requests(unavailable routes)
  app.use(function (err, req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });

};