//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = require('./models/connection.js');
const User = require("./models/User.js");
var cookieParser = require('cookie-parser');
var session = require('express-session');

//set up express app
var app = express();
var PORT = process.env.PORT || 8080;

//requiring models

//set up express app for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

//set up static Directory
app.use(express.static("public"));

//routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// create all the defined tables in the specified databae.
sequelize.sync({
    force: true
  })
  .then(() => {
    console.log('users table has been successfully created, if one doesn\'t exist')

    app.listen(PORT, function() {
      console.log("App listening on port " + PORT);
    });
  })
  .catch(error => console.log('This error occured', error));