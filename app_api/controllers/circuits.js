const Sequelize = require('sequelize');
const models = require('../models/db.js');

const Circuit = models.Circuits;

const index = function (req, res) {
  Circuit.findAndCountAll({
     offset: 0,
     limit: 20,
     include: [{ all: true }]
  })
  .then( results => {
    if (!results) {
        res
          .status(404)
          .json({"message":"Circuit not found"});
        return;
    } 
    let circuits = [];
    results.rows.forEach((doc) => {
      circuits.push({
        name: doc.name,
        location: doc.location,
        country: doc.country,
        lat: doc.lat,
        lng: doc.lng,
        url: doc.url,
        circuitId: doc.circuitId
      });
    });
    res
      .status(200)
      .json(circuits);
  });
};

const circuitsCreate = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

const readCircuitInfo = function (req, res) {
  if (req.params && req.params.circuitid) {
    Circuit.findById(req.params.circuitid).then( circuit => {
      if (!circuit) {
        res
          .status(404)
          .json({"message":"Circuit not found"});
        return;
      } 
      res
        .status(200)
        .json(circuit);
    });
  } else {
    res
      .status(404)
      .json({"message": "No circuitid in request"});
  }
};

const updateCircuitInfo = function (req, res) {res
    .status(200)
    .json({"status" : "success"});
};

const deleteCircuitInfo = function (req, res) {res
    .status(200)
    .json({"status" : "success"});
};


module.exports = {
  index,
  circuitsCreate,
  readCircuitInfo,
  updateCircuitInfo,
  deleteCircuitInfo
};
