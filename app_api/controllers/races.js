const Sequelize = require('sequelize');
const models = require('../models/db.js');
const Op = Sequelize.Op;

const Races = models.Races;

const index = function (req, res) {
  Races.findAll({
    offset: 0,
    limit: 30,
    order: [ [ 'date', 'DESC' ]],
  }).then( results => {
    if(!results) {
      res
        .status(404)
        .json({"message":"No races found"});
      return;
    }
    res
      .status(200)
      .json(results);
  });
};

const racesCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const readRaceInfo = function (req, res) {
  if (req.params && req.params.raceid) {
    Races.findOne({
      where: {
        [Op.and]: {raceid: req.params.raceid},
      },
      include: [{
        model: Results,
        limit: 25,
        order: [ [ 'positionOrder', 'ASC' ]],
        include: [{
          model: Driver,
        },
        {
          model: Team,
        }]
      },
      {
        model: Circuit
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Race not found"});
        return;
      }
      let race = results;
      res
        .status(200)
        .json(race);
    });
  } else {
    res
      .status(404)
      .json({"message": "No raceid in request"});
  }
};

const raceResults = function (req, res) {
  if (req.params && req.params.raceid) {
    Results.findAll({
      limit: 25,
      order: [ [ 'positionOrder', 'ASC' ]],
      where: {
        [Op.and]: {raceid: req.params.raceid},
      },
      include: [{
        model: Driver,
      },
      {
        model: Team,
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Race not found"});
        return;
      }
      let race = results;
      res
        .status(200)
        .json(race);
    });
  } else {
    res
      .status(404)
      .json({"message": "No raceid in request"});
  }
};

const updateRaceInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const deleteRaceInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
  index,
  readRaceInfo,
  racesCreate,
  updateRaceInfo,
  deleteRaceInfo,
  raceResults
};
