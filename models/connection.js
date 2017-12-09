var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('mysql://root:root@localhost:3306/project2DB');
module.exports = sequelize;