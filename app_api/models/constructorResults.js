const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return ConstructorResults = sequelize.define('constructorResults', {
    constructorResultsId: {
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
    status: { type: DataTypes.STRING }
  },
  {
    timestamps: false
  });
};
