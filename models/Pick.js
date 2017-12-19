var Sequelize = require('sequelize');

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
    defaultValue: 0
  },
  week: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pickedTeam: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Pick.associate = function(models) {
    Pick.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

module.exports = Pick;