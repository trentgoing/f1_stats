const express = require('express');
const router = express.Router();

const controlHome = require('../controllers/home');
const controlDrivers = require('../controllers/drivers');
const controlRaces = require('../controllers/races');
const controlCircuits = require('../controllers/circuits');
const controlSeasons = require('../controllers/seasons');
const controlTeams = require('../controllers/teams');

/*  home page. */
router.get('/', controlHome.home);

/* Seasons pages. */
router.get('/seasons', controlSeasons.index);
router.get('/season', controlSeasons.seasonInfo);

/* Circuit pages */
router.get('/circuits', controlCircuits.index);
router.get('/circuit', controlCircuits.circuitInfo);

/* Driver pages */
router.get('/drivers', controlDrivers.index);
router.get('/driver', controlDrivers.driverInfo);

/* Driver pages */
router.get('/teams', controlTeams.index);
router.get('/team', controlTeams.teamInfo);

/* Races pages */
router.get('/race', controlRaces.raceInfo);

module.exports = router;
