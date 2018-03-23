const Sequelize = require('sequelize');
const Race = require('./races');
const Driver = require('./drivers');
const Status = require('./status');

module.exports = function(sequelize, DataTypes){

  return DriverStandings = sequelize.define('driverStandings', {
    driverStandingsId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    raceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Race,
        key: 'raceId'
      }
    },
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: Driver,
        key: 'driverId'
      }
    },
    points: { type: DataTypes.FLOAT },
    position: { type: DataTypes.INTEGER },
    positionText: { type: DataTypes.STRING },
    wins: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false
  });
};
