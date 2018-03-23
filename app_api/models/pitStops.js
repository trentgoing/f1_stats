const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return PitStops = sequelize.define("pitStops", {
    raceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Race,
        key: 'raceId'
      }
    },
    driverId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Driver,
        key: 'driverId'
      }
    },
    stop: { 
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    lap: { type: DataTypes.INTEGER },
    time: { type: DataTypes.TIME },
    duration: { type: DataTypes.STRING },
    milliseconds: { type: DataTypes.INTEGER }
  },
  {
    timestamps: false
  });
};
