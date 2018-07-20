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
      order: [ [ 'driverid', 'ASC' ]],
      include: [{
        model: Driver
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Race not found"});
        return;
      }
      let race = [];
      let laptimes = {};
      let cumLaptimes = {};
      let gapToLeader = {};
      results.forEach((doc) => {
        if (!laptimes[doc.lap]) {
          laptimes[doc.lap] = {lap: doc.lap};
          cumLaptimes[doc.lap] = {lap: doc.lap};
        }
        laptimes[doc.lap][doc.driver.surname] = doc.milliseconds;
        if (cumLaptimes[doc.lap - 1]) {
          cumLaptimes[doc.lap][doc.driver.surname] = doc.milliseconds + cumLaptimes[doc.lap - 1][doc.driver.surname];
        } else {
          cumLaptimes[doc.lap][doc.driver.surname] = doc.milliseconds;
        }
      });

      let laps = Object.keys(cumLaptimes);
      let drivers = Object.keys(cumLaptimes[1]);
      for (let i = 0; i < laps.length; i++) {
        let thisLap = cumLaptimes[laps[i]];
        let lapGaps = {};
        lapGaps.lap = thisLap.lap;
        for (let j = 1; j < drivers.length; j++) {
          if (thisLap[drivers[j]]) {
            lapGaps[drivers[j]] = thisLap[drivers[j]];// ADD THIS BACK FOR GAPS COMPUTED ON BACKEND - thisLap[drivers[FASTEST]];
          } else {
            lapGaps[drivers[j]] = 0;
          }
        }
        race[i] = lapGaps;
        //race[i] = cumLaptimes[laps[i]];
      }

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
