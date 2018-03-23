const Sequelize = require('sequelize');
const models = require('../models/db.js');

const index = function (req, res) {
  res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
  index
}
