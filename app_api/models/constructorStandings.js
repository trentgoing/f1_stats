const Sequelize = require('sequelize');
const Race = require('./races');
const Team = require('./teams');
const Status = require('./status');

module.exports = function(sequelize, DataTypes){

  return ConstructorStandings = sequelize.define('constructorStandings', {
    constructorStandingsId: {
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
    constructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: 'constructorId'
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
