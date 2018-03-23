const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://peaceful-island-57907.herokuapp.com'
};

/* Get Season Index */
const index = function (req, res) {
  const path = '/api/seasons';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showSeasonIndex(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

const _showSeasonIndex = function (req, res, responseBody) {
  console.log('Showing Index');
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No seasons found";
    }
  }
  res.render('season-index', { 
    title: 'Season index',
    seasons: responseBody,
    message: message
  });
};

const seasonInfo = function (req, res) {
  const path = `/api/seasons/${req.params.year}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  console.log('request');
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        console.log('rendering');
        _showSeasonInfo(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Get Season Info */
const _showSeasonInfo = function (req, res, responseBody) {
  let message = null;
  if (!responseBody) {
    message = "No seasons found";
    var season = [];
    var race = [];
    var driver_standings = [];
    var constructor_standings = []; 
  } else {
    var season = responseBody;
    var race = season.races[0];
    var driver_standings = race.driverStandings;
    var constructor_standings = race.constructorStandings;
  }
  res.render('season-info', { 
    title: 'Season',
    season: season,
    driver_standings: driver_standings,
    constructor_standings: constructor_standings,
    dr_stand_placeholder: 
    [{
        name: 'Hamilton',
        place: 1,
        team: 'Mercedes AMG Petronas',
        points: 124,
        finishes: [4, 1, 2, 1, 0, 1]
      }],
    team_standings: [
      {
        place: 1,
        name: 'Mercedes',
        points: 124,
        finishes: [4, 1, 2, 1, 0, 1]
      }],
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
  seasonInfo
};
