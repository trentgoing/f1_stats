const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Results = sequelize.define("results", {
    resultId: {
      type: DataTypes.INTEGER(11),
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
    constructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: 'constructorId'
      }
    },
    number: { type: DataTypes.INTEGER },
    grid: { type: DataTypes.INTEGER },
    position: { type: DataTypes.INTEGER },
    positionText: { type: DataTypes.STRING },
    positionOrder: { type: DataTypes.INTEGER },
    points: { type: DataTypes.FLOAT },
    laps: { type: DataTypes.INTEGER },
    time: { type: DataTypes.STRING },
    milliseconds: { type: DataTypes.INTEGER },
    fastestLap: { type: DataTypes.INTEGER },
    rank: { type: DataTypes.INTEGER },
    fastestLapTime: { type: DataTypes.STRING },
    fastestLapSpeed: { type: DataTypes.STRING },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: Status,
        key: 'statusId'
      }
    }
  },
  {
    timestamps: false
  });
};
