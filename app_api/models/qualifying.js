const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Qualifying = sequelize.define("qualifying", {
    qualifyId: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
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
    position: { type: DataTypes.INTEGER },
    q1: { type: DataTypes.STRING },
    q2: { type: DataTypes.STRING },
    q3: { type: DataTypes.STRING }
  },
  {
    timestamps: false
  });
};
