const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Season = sequelize.define('season', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: { type: DataTypes.STRING }
  },
  {
    timestamps: false
  });
};
