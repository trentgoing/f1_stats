const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://peaceful-island-57907.herokuapp.com'
};

/* Get Driver Index */
const index = function (req, res) {
  const path = '/api/drivers';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showDriverIndex(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Get Driver Info */
const driverInfo = function (req, res) {
  const path = `/api/drivers/${req.params.driverid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _showDriverInfo(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};


const _showDriverInfo = function (req, res, driverInfo) {
  let message = null;
  if (!driverInfo.length) {
    message = "No driver found";
  }
  res.render('drivers-info', { 
    title: 'Driver Information',
    driver_new: driverInfo,
    driver: {
      name: driverInfo.forename,
      country: 'Germany',
      birth_year: '3/7/897',
      overall: {
        seasons: 10,
        points: 2355,
        podiums: 96,
        grands_prix: 194,
        best_finish: '1 (x46)',
        best_grid: '1 (x40)',
      },
      full_history: [
        {
          season: 2010,
          points: 124,
          finish: 3,
          podiums: 3,
          grands_prix: 20,
          team: 'Ferarri',
          finishes: [1, 2, 4, 2, 1, 2, 3, 4, 0, 11, 1, 2, 1, 3, 4]
        },
        {
          season: 2011,
          points: 224,
          finish: 4,
          podiums: 6,
          grands_prix: 20,
          team: 'Red Bull Racing',
          finishes: [1, 2, 4, 2, 1, 2, 3, 4, 0, 11, 1, 2, 1, 3, 4]
        }
      ]
    }
  });
};

const _showDriverIndex = function (req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No drivers found";
    }
  }
  res.render('drivers-index', { 
    title: 'Drivers index',
    drivers: responseBody,
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
  driverInfo
};
