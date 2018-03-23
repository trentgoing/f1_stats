const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://peaceful-island-57907.herokuapp.com'
};

/* Get Team Index */
const index = function (req, res) {
  const path = '/api/teams';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showTeamIndex(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Get Team Info */
const teamInfo = function (req, res) {
  const path = `/api/teams/${req.params.teamid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showTeamInfo(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

const _showTeamInfo = function (req, res, responseBody) {
  let message = null;
  if (!responseBody.length) {
    message = "No teams found";
  }
  results = responseBody.results;
  races =[];
  for (i = 0; i<results.length-1; i = i+2) {
    console.log(i);
    race = {
      raceInfo: results[i].race,
      driver_1: {
        resultId: results[i].resultId,
        driverId: results[i].driverId,
        constructorId: results[i].constructorId,
        number: results[i].number,
        grid: results[i].grid,
        position: results[i].position,
        positionText: results[i].positionText,
        positionOrder: results[i].positionOrder,
        points: results[i].points,
        laps: results[i].laps,
        time: results[i].time,
        milliseconds: results[i].milliseconds,
        fastestLap: results[i].fastestLap,
        rank: results[i].rank,
        fastestLapTime: results[i].fastestLapTime,
        fastestLapSpeed: results[i].fastestLapSpeed,
        statusId: results[i].statusId,
        driverInfo: results[i].driver
      },
      driver_2: {
        resultId: results[i+1].resultId,
        driverId: results[i+1].driverId,
        constructorId: results[i+1].constructorId,
        number: results[i+1].number,
        grid: results[i+1].grid,
        position: results[i+1].position,
        positionText: results[i+1].positionText,
        positionOrder: results[i+1].positionOrder,
        points: results[i+1].points,
        laps: results[i+1].laps,
        time: results[i+1].time,
        milliseconds: results[i+1].milliseconds,
        fastestLap: results[i+1].fastestLap,
        rank: results[i+1].rank,
        fastestLapTime: results[i+1].fastestLapTime,
        fastestLapSpeed: results[i+1].fastestLapSpeed,
        statusId: results[i+1].statusId,
        driverInfo: results[i+1].driver
      },
    };
    races.push(race);
  }

    res.render('team-info', { 
    title: 'Team Information',
    team_new: responseBody,
    message: message,
    races: races,
    team: {
      name: "Ferarri",
      location: "Maranello, Italy",
      first_year: 1950,
      overall: {
        seasons: 67,
        wcc: 16,
        best_wcc: "1 (x16)",
        points: 5000,
        grands_prix: 500,
        pole_pos: 200, 
        best_finish: "1 (x299)"
      },
      current_season: {
        year: 2017,
        standing: 2,
        points: 285,
        team_chief: "Maurizio Arrivabene",
        tech_chief: "Mattia Binotto",
        drivers: ['Sebastian Vettel', 'Kimi Raikkonen'],
        chassis: 'SF70H',
        races: [
          {
            race: 'Australia',
            points: 40,
            driver_1: 'Sebastian Vettel',
            finish_1: 1,
            start_1: 4,
            qual_1: 4,
            pits_1: [35],
            driver_2: 'Kimi Raikkonen',
            finish_2: 4,
            start_2: 5,
            qual_2: 5,
            fast_lap: '1:19.370',
            pits_2: [37]
          },
          {
            race: 'Bahrain',
            points: 35,
            driver_1: 'Sebastian Vettel',
            finish_1: 2,
            start_1: 2,
            qual_1: 2,
            pits_1: [35],
            driver_2: 'Kimi Raikkonen',
            finish_2: 3,
            start_2: 5,
            qual_2: 5,
            fast_lap: '1:19.370',
            pits_2: [37]
          },
          {
            race: 'Canada',
            points: 25,
            driver_1: 'Sebastian Vettel',
            finish_1: 1,
            start_1: 1,
            qual_1: 1,
            pits_1: [35],
            driver_2: 'Kimi Raikkonen',
            finish_2: 0,
            start_2: 3,
            qual_2: 4,
            fast_lap: '1:19.370',
            pits_2: [37]
          },
        ]
      },
      full_history: [
        {
          season: 2010,
          points: 124,
          finish: 3,
          podiums: 3,
          grands_prix: 20,
          drivers: [
            {
              name:'Sebastian Vettel',
              finish: 1
            },
            {
              name:'Kimi Raikkonen',
              finish: 2
            },
          ]
        },
        {
          season: 2011,
          points: 224,
          finish: 4,
          podiums: 6,
          grands_prix: 20,
          drivers: [
            {
              name:'Sebastian Vettel',
              finish: 1
            },
            {
              name:'Kimi Raikkonen',
              finish: 2
            },
          ]
        }
      ]
    }
  });
};

const _showTeamIndex = function (req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No teams found";
    }
  }
  res.render('team-index', { 
    title: 'Teams index',
    teams: responseBody,
    message: message
  });
};

const _showError = function (req, res, status) {
  let title = '';
  let content = '';
  if (status === 404) {
    title = '404, page not found';
    content = 'Sorry, but we can\'t find this page.';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

module.exports = {
  index,
  teamInfo
};
