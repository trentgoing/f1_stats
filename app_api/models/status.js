const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

  return Status = sequelize.define('status', {
    statusId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    status: { type: DataTypes.STRING }
  },
  {
    timestamps: false
  });
};
