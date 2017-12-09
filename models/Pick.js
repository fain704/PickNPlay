var Sequelize = require('sequelize');
var User = require('./User.js');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = require("./connection.js");
const Pick = sequelize.define("Pick", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  score: {
    type: Sequelize.INTEGER,
    default: 0
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = Pick;