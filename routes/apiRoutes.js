// var db = require('../models');
const game = require("../models/game");
var week =0

module.exports = function(app) {

  //
  app.get('/api', function(req, res) {

  });

  app.post('/api/post', function(req, res) {

  });

  app.delete('/api/delete', function(req, res) {

  });

  app.get('/api/getGames', function(req,res){
    game.findAll({
      where:{}
    }).then((result) => {
      console.log(JSON.stringify(result));
      res.body(JSON.stringify(results));
    });
  });

  app.get('/api/startGame', function(req, res) {
    //Use this fucntion to find all picks as well (findAll)
    week++
    game.destroy(
        {
        where: {}
      }
    );

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
      game.create({
        week: week,
        homeTeam: teams.home,
        awayTeam: teams.away,
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