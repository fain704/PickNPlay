//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var sequelize = require('./models/connection.js');
const User = require("./models/User.js");
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

//sync db
// db.sequelize.sync().then(function() {
//
// });

// create all the defined tables in the specified databae.
sequelize.sync({
    //force: true
  })
  .then(() => {
    console.log('users table has been successfully created, if one doesn\'t exist')

    app.listen(PORT, function() {
      console.log("App listening on port " + PORT);
    });
  })
  .catch(error => console.log('This error occured', error));