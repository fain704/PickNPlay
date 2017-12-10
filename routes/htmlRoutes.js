//dependencies
var User = require("../models/user");
var path = require('path');

//routes
module.exports = function(app) {

  

  // middleware function to check for logged-in users
  var sessionChecker = (req, res, next) => {
      if (req.session.user && req.cookies.user_sid) {
          res.redirect('/');
      } else {
          next();
      }    
  };

  //index
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

  // route for user signup
  app.route('/signup')
      .get(sessionChecker, (req, res) => {
          res.sendFile(__dirname + './public/login.html');
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

  //login
  app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + './public/login.html');
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
  // app.get('/team', function(err, req, res) {
  //   if (err) throw err;
  //   res.sendFile(path.join(__dirname + "../public/team.html"));
  // });

  app.get('/team', function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

  //score route
  // app.get('/score', function(err, req, res) {
  //   if (err) throw err;
  //   res.sendFile(path.join(__dirname + "../public/scores.html"));
  // });

  app.get('/score', function(req, res) {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

  //team schedule
  app.get('/schedule', function(err, req, res) {
    if (err) throw err;
    res.sendFile(path.join(__dirname + "./public/schedule.html"));
  });


  // route for user logout
  app.get('/logout', (req, res) => {
      if (req.session.user && req.cookies.user_sid) {
          res.clearCookie('user_sid');
          res.redirect('/');
      } else {
          res.redirect('/');
      }
  });

  // route for handling 404 requests(unavailable routes)
  app.use(function (err, req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });

};