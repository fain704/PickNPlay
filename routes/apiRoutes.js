// var db = require('../models');
const Pick = require("../models/Pick");


module.exports = function(app) {

  //
  app.get('/api', function(req, res) {

  });

  app.post('/api/post', function(req, res) {

  });

  app.delete('/api/delete', function(req, res) {

  });

  app.get('/testPick/:userId', function(req, res) {
    //Use this fucntion to find all picks as well (findAll)
    Pick.destroy({
      where: {
        UserId: req.params.userId
      }
    });

    var awayTeams = [
      "Arizona Cardinals",
      "Kanas City Chiefs",
      "Dallas Cowboys",
      "New York Jets",
      "San Diego Chargers",
      "Tampa Bay Buccaneers",
      "Washington Redskins",
      "Green Bay Packers",
      "Chicago Bears",
      "New Orleans Saints",
      "Houston Texans",
      "Carolina Panters",
      "Pittsburgh Steelers",
      "Cleveland Browns",
      "Baltimore Ravens",
      "Minnesota Vikings"
    ];

    var homeTeams = [
      "Atlanta Falcons",
      "Buffalo Bills",
      "Cincinnati Bengals",
      "Denver Broncos",
      "Detroit Lions",
      "Indianapolis Colts",
      "Jasksonville Jaguars",
      "Miami Dolphins",
      "New England Patriots",
      "New York Giants",
      "Oakland Raiders",
      "Philadelphia Eagles",
      "Los Angeles Rams",
      "San Francisco 49ers",
      "Seattle Seahawks",
      "Tennessee Titans"
    ];


    //pick varible for sql
    var picks = [];

    for (let i = 0; i < 16; i++) {

      var teams = pickTeams(awayTeams, homeTeams);

      //Create function for SQL DB
      Pick.create({
        week: 0,
        score: 0,
        homeTeam: teams.home,
        awayTeam: teams.away,
        UserId: req.params.userId
      }).then((pick) => {

        picks.push(pick);

        if (picks.length === 16) res.status(200).json(picks);

      });

    }

  });

};

//Code to run random team picks
function pickTeams(awayTeams, homeTeams) {
  //Random team picks
  var awayIndex = Math.floor(Math.random() * awayTeams.length);
  var homeIndex = Math.floor(Math.random() * homeTeams.length);

  var away = awayTeams[awayIndex];
  var home = homeTeams[homeIndex];

  //Splice deletes used items from the array
  awayTeams.splice(awayIndex, 1);
  homeTeams.splice(homeIndex, 1);

  return {
    home,
    away
  }
}