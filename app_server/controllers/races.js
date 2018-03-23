const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://peaceful-island-57907.herokuapp.com'
};

const index = function (req, res) {
  const path = '/api/races';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showRaceIndex(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Get Race Info */
const raceInfo = function (req, res) {
  const path = `/api/races/${req.params.raceid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showRaceInfo(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

const _showRaceInfo = function (req, res, raceInfo) {
  let message = null;
  if (!raceInfo.length) {
    message = "No race found";
  }
  res.render('race', { 
    title: 'Race Information',
    race: raceInfo,
    race_name: 'Singapore',
    race_year: '2017',
    fastest_lap: '1:18.450',
    circuit: {
      name: 'Marina Bay Street Circuit',
      link: '/circuit',
      laps: 58,
      lap_record: '1:18.490'
    },
    results: raceInfo.results,
    results_old:[
      {
        name: 'Hamilton',
        finish: 1,
        team: 'Mercedes AMG Petronas',
        start: 4,
        qual: 4,
        fast_lap: '1:18.490',
        pits: [35]
      },
      {
        name: 'Ricciardo',
        finish: 2,
        team: 'Red Bull Racing',
        start: 5,
        qual: 5,
        fast_lap: '1:19.000',
        pits: [35]
      },
      {
        name: 'Bottas',
        finish: 3,
        team: 'Mercedes AMG Petronas',
        start: 6,
        qual: 6,
        fast_lap: '1:18.450',
        pits: [40]
      },
      {
        name: 'Perez',
        finish: 4,
        team: 'Sarhara Force India',
        start: 8,
        qual: 8,
        fast_lap: '1:21.490',
        pits: [2, 40]
      },
      {
        name: 'Ocon',
        finish: 5,
        team: 'Sarhara Force India',
        start:14,
        qual: 11,
        fast_lap: '1:22.490',
        pits: [13]
      }],
    race_data: {
      lap_1: {
        lap: 1,
        race_time: '00:00:00.000',
        fastest: '1:20.999',
        average: '1:20.999',
        drivers: [
        {
          name: 'Vettel',
          position: 1,
          lap_time: '1:20.999',
        },
        {
          name: 'Verstappen',
          position: 2,
          lap_time: '1:20.999',
        },
        {
          name:'Raikkonen',
          position: 3,
          lap_time: '1:20.999',
        }]
      },
      lap_2: {
        lap: 2,
        race_time: '00:01:20.999',
        fastest: '1:20.999',
        average: '1:20.999',
        drivers: [
        {
          name: 'Hamilton',          
          position: 1,
          lap_time: '1:20.999',
        },
        {
          name: 'Ricciardo',
          position: 2,
          lap_time: '1:20.999',
        },
        {
          name:'Bottas',
          position: 3,
          lap_time: '1:20.999',
        }]
      }
    }
  });
};

const _showRaceIndex = function (req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No races found";
    }
  }
  res.render('race-index', { 
    title: 'Race index',
    races: responseBody,
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
  raceInfo
};
