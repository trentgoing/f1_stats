const Sequelize = require('sequelize');

const sequelize = new Sequelize('f1_db', 'trentgoing', 'crunchamuncha', {
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var models = ['Races', 'Status', 'Circuits', 'Teams', 'ConstructorStandings', 'Drivers', 'DriverStandings', 'LapTimes', 'PitStops', 'Qualifying', 'Results', 'Seasons', 'ConstructorResults'];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Status.belongsTo(m.Results, { foreignKey: 'statusid'});
  m.Results.hasOne(m.Status, { foreignKey: 'statusid'});

  m.Seasons.hasMany(m.Races, { foreignKey: 'year'});
  m.Races.belongsTo(m.Seasons, { foreignKey: 'year'});

  m.Results.belongsTo(m.Races, { foreignKey: 'raceid' });
  m.Races.hasMany(m.Results, { foreignKey: 'raceid' });

  m.ConstructorResults.belongsTo(m.Teams, { foreignKey: 'constructorId' });
  m.Teams.hasMany(m.ConstructorResults, { foreignKey: 'constructorId'});
  
  m.ConstructorResults.belongsTo(m.Races, { foreignKey: 'raceid' });
  m.Races.hasMany(m.ConstructorResults, { foreignKey: 'raceid' });

  m.DriverStandings.belongsTo(m.Races, { foreignKey: 'raceid' });
  m.Races.hasMany(m.DriverStandings, { foreignKey: 'raceid' });
  
  m.DriverStandings.belongsTo(m.Drivers, { foreignKey: 'driverid' });
  m.Drivers.hasMany(m.DriverStandings, { foreignKey: 'driverid' });

  m.Results.belongsTo(m.Drivers, { foreignKey: 'driverid' });
  m.Drivers.hasMany(m.Results, { foreignKey: 'driverid' });

  m.ConstructorStandings.belongsTo(m.Races, { foreignKey: 'raceid' });
  m.Races.hasMany(m.ConstructorStandings, { foreignKey: 'raceid' });

  m.ConstructorStandings.belongsTo(m.Teams, { foreignKey: 'constructorId' });
  m.Teams.hasMany(m.ConstructorStandings, { foreignKey: 'constructorId' });

  m.Results.belongsTo(m.Teams, { foreignKey: 'constructorId' });
  m.Teams.hasMany(m.Results, { foreignKey: 'constructorId'});

  m.Races.belongsTo(m.Circuits, { foreignKey: 'circuitid' });
  m.Circuits.hasMany(m.Races, { foreignKey: 'circuitid'});

  // For LapTimes
  m.LapTimes.belongsTo(m.Races, { foreignKey: 'raceid' });
  m.Races.hasMany(m.LapTimes, { foreignKey: 'raceid' });

  m.LapTimes.belongsTo(m.Drivers, { foreignKey: 'driverid' });
  m.Drivers.hasMany(m.LapTimes, { foreignKey: 'driverid' });

})(module.exports);

module.exports.sequelize = sequelize;
