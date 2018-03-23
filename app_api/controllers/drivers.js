const Sequelize = require('sequelize');
const models = require('../models/db.js');
const Op = Sequelize.Op;

const Drivers = models.Drivers;
const Results = models.Results;
const Races = models.Races;
const Seasons = models.Seasons;

const index = function (req, res) {
  Drivers.findAndCountAll({
    offset: 0,
    limit: 20
  })
  .then( results => {
    if(!results) {
      res
        .status(404)
        .json({"message":"No drivers found"});
      return;
    }
    let drivers = [];
    results.rows.forEach((doc) => {
      drivers.push({
        name: doc.forename + ' ' + doc.surname,
        number: doc.number,
        abbrv: doc.code,
        nationality: doc.nationality,
        url: doc.url,
        driverId: doc.driverId,
      });
    });
    res
      .status(200)
      .json(drivers);
  });
};

const driversCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const readDriverInfo = function (req, res) {
  if (req.params && req.params.driverid) {
    Drivers.findOne({
      where: {
        [Op.and]: {driverid: req.params.driverid},
      },
      include: [{
        model: Results,
        limit: 25,
        order: [ [ 'raceid', 'DESC' ]],
        include: [{
          model: Races,
        }]
      },
      {
        model: DriverStandings,
        limit: 1,
        order: [ [ 'raceid', 'DESC' ]],
        include: [{
          model: Races
        }]
      }]
    }).then(results => {
      if(!results) {
        res
          .status(404)
          .json({"message": "Driver not found"});
        return;
      }
      let driver = results;
      res
        .status(200)
        .json(driver);
    });
  } else {
    res
      .status(404)
      .json({"message": "No driverid in request"});
  }
};

const readDriversSeasonInfo = function (req, res) {
  if (req.params && req.params.driverid) {
    Seasons.findAndCountAll({
      order: [ [ 'year', 'DESC' ]],
      include: [{
        model: Races,
        limit: 1,
        order: [ [ 'date', 'DESC' ]],
        include: [
          {
            model: DriverStandings,
            where: {
              [Op.and]: {driverid: req.params.driverid},
            },
            required: true
          }
        ]
      }]
    })
    .then( results => {
      if(!results) {
        res
          .status(404)
          .json({"message":"Circuit not found"});
        return;
      }
      let seasons = [];
      results.rows.forEach((doc) => {
        if (doc.races.length !== 0) {
          seasons.push(doc);
        }
      });
      res
        .status(200)
        .json(seasons);
    });
  } else {
    res
      .status(404)
      .json({"message": "No driverid in request"});
  }
};

const updateDriverInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const deleteDriverInfo = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};


module.exports = {
  index,
  driversCreate,
  readDriverInfo,
  readDriversSeasonInfo,
  updateDriverInfo,
  deleteDriverInfo
};
