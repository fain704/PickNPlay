var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var Pick = require('./Pick.js');
// create a sequelize instance with our local postgres database information.
var sequelize = require("./connection.js");

// setup User model and its fields.
var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});

User.prototype.validPassword = function(password) {
  var passwordCheck = bcrypt.compareSync(password, this.password);
  console.log("password Check: ", passwordCheck);
  return passwordCheck;
};



User.associate = function(models) {
  User.hasMany(models.Pick, {
    as: "Picks"
  });
};
// export User model for use in other files.
module.exports = User;