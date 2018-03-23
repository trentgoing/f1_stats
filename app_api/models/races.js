const Sequelize = require('sequelize');
const Circuit = require('./circuits');

module.exports = function(sequelize, DataTypes){

  return Race = sequelize.define('races', {
    raceId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    year: { type: DataTypes.DOUBLE },
    round: { type: DataTypes.INTEGER },
    circuitId: {
      type: DataTypes.INTEGER,
      references: {
        model: Circuit,
        key: 'circuitId'
      }
    },
    name: { type: DataTypes.STRING },
    date: { type: DataTypes.DATEONLY },
    time: { type: DataTypes.DATE },
    url: { type: DataTypes.STRING },
  },
  {
    timestamps: false
  });
};
