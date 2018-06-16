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

const readLapTimes = function (req, res) {
  if (req.params && req.params.raceid) {
    LapTimes.findAll({
      where: {
        [Op.and]: {raceid: req.params.raceid},
      },
      order: [ [ 'driverid', 'ASC' ]]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Race not found"});
        return;
      }
      // THIS IS WHERE I CAN MANIPULATE I HOPE!!?
      // need the data in format of array of objects, where each object is a lap with drivers
      //var data = [
      //  {lap: lap_number, surname_example: milliseconds, surname_example: milliseconds...},
      //  {lap: 1, Hamilton: 106128, Rosberg: 106128, Ricciardo: 106128},
      //  {lap: 2, Hamilton: 100287, Rosberg: 100287, Ricciardo: 100287},
      //  {lap: 3, Hamilton: 102038, Rosberg: 102038, Ricciardo: 102038}
      //];
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
  raceResults,
  readLapTimes
};
