const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://peaceful-island-57907.herokuapp.com'
};

/* Get circuit Index */
const index = function (req, res) {
  const path = '/api/circuits';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _renderCircuitIndex(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Get circuit Info */
const circuitInfo = function(req, res) {
  const path = `/api/circuits/${req.params.circuitid}`;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, response, body) => {
      if (response.statusCode === 200) {
        _renderCircuitInfo(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

const _renderCircuitInfo = function(req, res, circuitInfo) {
  res.render('circuit-info', { 
    title: 'Circuit Information', 
    circuit: {
      name: circuitInfo.name,
      location: circuitInfo.location,
      country: circuitInfo.country,
      overall: {
        seasons: 10,
        lap_record: '1:18.490',
        lap_record_year: 2017,
        victories: [
          {
            name: "Lewis Hamilton",
            wins: 4
          },
          {
            name: "Sebastian Vettel",
            wins: 1
          }
        ]
      },
      full_history: [
        {
          season: 2017,
          fastest_lap: '1:18.490',
          results: [
            {
              name: "Lewis Hamilton",
              place: 1
            },
            {
              name: "Sebastian Vettel",
              place: 2
            },
            {
              name: "Kimi Raikkonen",
              place: 3
            }
          ]
        },
        {
          season: 2016,
          fastest_lap: '1:18.490',
          results: [
            {
              name: "Lewis Hamilton",
              place: 1
            },
            {
              name: "Nico Rosberg",
              place: 2
            },
            {
              name: "Kimi Raikkonen",
              place: 3
            }
          ]
        },
      ]
    }
  });
};

const _renderCircuitIndex = function(req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No circuits found";
    }
  }
  res.render('circuit-index', { 
    title: 'Circuit Index', 
    circuits: responseBody,
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
  circuitInfo
};
