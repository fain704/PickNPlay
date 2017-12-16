var Sequelize = require('sequelize');

// create a sequelize instance with our local postgres database information.
var sequelize = require("./connection.js");

const Game = sequelize.define("Game", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  homeTeam: {
    type: Sequelize.STRING,
    allowNull: false
  },
  awayTeam: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Game;