const Sequelize = require('sequelize');
const models = require('../models/db.js');
const Op = Sequelize.Op;

const Seasons = models.Seasons;
const Drivers = models.Drivers;
const Results = models.Results;
const Races = models.Races;
const DriverStandings = models.DriverStandings;
const ConstructorStandings = models.ConstructorStandings;

const index = function (req, res) {
  Seasons.findAndCountAll({
    offset: 0,
    limit: 20,
    order: [ [ 'year', 'DESC' ]],
  }).then( results => {
    if(!results) {
      res
        .status(404)
        .json({"message":"No seasons found"});
      return;
    }
    res
      .status(200)
      .json(results.rows);
  });
};

const seasonsCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const readSeasonInfo = function (req, res) {
  if (req.params && req.params.year) {
    Seasons.findOne({
      where: {
        [Op.and]: {year: req.params.year},
      },
      include: [{
        model: Races,
        limit: 1,
        order: [ [ 'date', 'DESC' ]],
        include: [{
          model: DriverStandings,
          order: [ [ 'points', 'DESC' ]],
          limit: 30,
          include: [{
            model: Driver
          }]
        },
        {
          model: ConstructorStandings,
          limit: 30,
          include: [{
            model: Team
          }]
        }]
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Season not found"});
        return;
      }
      let season = results;
      res
        .status(200)
        .json(season);
    });
  } else {
    res
      .status(404)
      .json({"message": "No season year in request"});
  }
};

const readSeasonRaceInfo = function (req, res) {
  if (req.params && req.params.year) {
    Seasons.findAndCountAll({
      where: {
        [Op.and]: {year: req.params.year},
      },
      include: [{
        model: Races,
        order: [ [ 'date', 'DESC' ]],
        include: [{
          model: DriverResults,
          limit: 30,
          include: [{
            model: Driver
          }]
        }]
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Season not found"});
        return;
      }
      let season = results;
      res
        .status(200)
        .json(season);
    });
  } else {
    res
      .status(404)
      .json({"message": "No season year in request"});
  }
};

const updateSeasonInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const deleteSeasonInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
  index,
  seasonsCreate,
  readSeasonInfo,
  updateSeasonInfo,
  deleteSeasonInfo
};
