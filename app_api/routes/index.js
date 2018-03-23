const express = require('express');
const router = express.Router();

const controlHome = require('../controllers/home');
const controlDrivers = require('../controllers/drivers');
const controlRaces = require('../controllers/races');
const controlCircuits = require('../controllers/circuits');
const controlSeasons = require('../controllers/seasons');
const controlTeams = require('../controllers/teams');

/*  home page. */
router
  .route('/')
  .get(controlHome.index);

/* Seasons pages. */
router
  .route('/seasons')
  .get(controlSeasons.index)
  .post(controlSeasons.seasonsCreate);

router
  .route('/seasons/:year')
  .get(controlSeasons.readSeasonInfo)
  .put(controlSeasons.updateSeasonInfo)
  .delete(controlSeasons.deleteSeasonInfo);

/* Circuit pages */
router
  .route('/circuits')
  .get(controlCircuits.index)
  .post(controlCircuits.circuitsCreate);

router
  .route('/circuits/:circuitid')
  .get(controlCircuits.readCircuitInfo)
  .put(controlCircuits.updateCircuitInfo)
  .delete(controlCircuits.deleteCircuitInfo);

/* Driver pages */
router
  .route('/drivers')
  .get(controlDrivers.index)
  .post(controlDrivers.driversCreate);

router
  .route('/drivers/:driverid')
  .get(controlDrivers.readDriverInfo)
  .put(controlDrivers.updateDriverInfo)
  .delete(controlDrivers.deleteDriverInfo);

router
  .route('/driverseason/:driverid')
  .get(controlDrivers.readDriversSeasonInfo);

/* Team pages */
router
  .route('/teams')
  .get(controlTeams.index)
  .post(controlTeams.constructorsCreate);

router
  .route('/teams/:constructorid')
  .get(controlTeams.readConstructorInfo)
  .put(controlTeams.updateConstructorInfo)
  .delete(controlTeams.deleteConstructorInfo);

router
  .route('/teamresult/:teamresultid')
  .get(controlTeams.readResultConstructor);

router
  .route('/teamstanding/:teamid')
  .get(controlTeams.readConstructorStanding);

/* Races pages */
router
  .route('/races')
  .get(controlRaces.index)
  .post(controlRaces.racesCreate);

router
  .route('/races/:raceid')
  .get(controlRaces.readRaceInfo)
  .put(controlRaces.updateRaceInfo)
  .delete(controlRaces.deleteRaceInfo);

router
  .route('/raceresults/:raceid')
  .get(controlRaces.raceResults);

module.exports = router;
