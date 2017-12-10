//dependencies
var User = require("../models/user");
var path = require('path');

//routes
module.exports = function(app) {

  

  // middleware function to check for logged-in users
  var sessionChecker = (req, res, next) => {
      if (req.session && req.cookies) {
          next();
      } else {
          res.redirect('/login');
      }    
  };

  //index route
  app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
  });

  // route for user signup
  app.route('/signup')
      .get((req, res) => {
          res.status(200).sendFile(path.join(__dirname, '../public/login.html'));
      })
      .post((req, res) => {
          User.create({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
          })
          .then(user => {
              req.session.user = user.dataValues;
              res.redirect('/team');
          })
          .catch(error => {
              res.redirect('/signup');
          });
      });

  //login route
  app.route('/login')
    .get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../public/login.html'));
    })
    .post((req, res, next) => {
        var username = req.body.username,
            password = req.body.password;
        console.log(req.body);
        User.findOne({ where: { username: username } }).then(function (user) {
            try{
                if (!user) {
                    res.redirect('/login');
                } else if (!user.validPassword(password)) {
                    res.redirect('/login');
                } else {
                    req.session.user = user.dataValues;
                    res.redirect('/');
                }
            }catch(err){
                console.log("error: ", err);
                next(err);
            }
        });
    });


  //team route
  app.get('/team', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../public/team.html"));
  });

  //score route
  app.route('/scores')
  .get(sessionChecker, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/scores.html"));
  });

  //team schedule
  app.route('/schedule')
  .get(sessionChecker, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/schedule.html"));
  });


  // route for user logout
  app.get('/logout', (req, res) => {
      if (req.session && req.cookies) {
          res.clearCookie('user_sid');
          res.redirect('/');
      } else {
          res.redirect('/');
      }
  });

  // route for handling 404 requests(unavailable routes)
  app.get(function (err, req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });

};