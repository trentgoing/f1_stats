const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Team = sequelize.define("constructor", {
    constructorId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    constructorRef: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    nationality: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING }
  },
  {
    timestamps: false
  });
};
