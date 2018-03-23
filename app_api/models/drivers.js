const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Driver = sequelize.define("drivers", {
    driverId: {
      type: DataTypes.INTEGER(11),
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    driverRef: { type: DataTypes.STRING },
    number: { type: DataTypes.INTEGER },
    code: { type: DataTypes.STRING(3) },
    forename: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATEONLY },
    nationality: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING }
  },
  {
    timestamps: false
  });
};
