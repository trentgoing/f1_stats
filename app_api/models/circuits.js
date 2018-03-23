const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Circuit = sequelize.define("circuits", {
    circuitId: {
      type: DataTypes.INTEGER(11),
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    circuitRef: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    lat: { type: DataTypes.FLOAT },
    lng: { type: DataTypes.FLOAT },
    alt: { type: DataTypes.INTEGER(11) },
    url: { type: DataTypes.STRING },
  },
  {
    timestamps: false
  });
};
