const Sequelize = require('sequelize');
const models = require('../models/db.js');
const Op = Sequelize.Op;

const ConstructorResults = models.ConstructorResults;

const index = function (req, res) {
  Team.findAndCountAll({
    offset: 0,
    limit: 20
  }).then( results => {
    if(!results) {
      res
        .status(404)
        .json({"message":"No Constructors found"});
      return;
    }
    res
      .status(200)
      .json(results.rows);
  });
};

const readResultConstructor = function (req, res) {
  ConstructorResults.findOne({
    where: {
      [Op.and]: {constructorResultsId: req.params.teamresultid},
    },
    include: [
     {
       model: Team,
     }]
  }).then( results => {
    if(!results) {
      res
        .status(404)
        .json({"message":"No Constructors found"});
      return;
    }
    res
      .status(200)
      .json(results);
  });
}

const readConstructorStanding = function (req, res) {
  ConstructorStandings.findAll({
    include: [
     {
       model: Race,
       where: { raceId: req.params.teamid }
     }]
  }).then( results => {
    if(!results) {
      res
        .status(404)
        .json({"message":"No Constructors found"});
      return;
    }
    res
      .status(200)
      .json(results);
  });
}

const constructorsCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const readConstructorInfo = function (req, res) {
  if (req.params && req.params.constructorid) {
    Team.findOne({
      where: {
        [Op.and]: {constructorid: req.params.constructorid},
      },
      include: [{
        model: Results,
        limit: 50,
        order: [ [ 'raceid', 'DESC' ]],
        include: [{
          model: Race
        },
        {
          model: Driver
        }]
      },
      {
        model: ConstructorStandings,
        limit: 1,
        order: [ [ 'raceid', 'DESC' ]],
        include: [{
          model: Race
        }]
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Team not found"});
        return;
      }
      let team = results;
      res
        .status(200)
        .json(team);
    });
  } else {
    res
      .status(404)
      .json({"message": "No teamid in request"});
  }
};

const updateConstructorInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const deleteConstructorInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
  index,
  constructorsCreate,
  readConstructorInfo,
  readResultConstructor,
  updateConstructorInfo,
  deleteConstructorInfo,
  readConstructorStanding
};
