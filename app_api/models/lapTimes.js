const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return LapTimes = sequelize.define("lapTimes", {
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
    lap: { 
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    postition: { type: DataTypes.INTEGER },
    time: { type: DataTypes.STRING },
    milliseconds: { type: DataTypes.INTEGER }
  },
  {
    timestamps: false
  });
};
