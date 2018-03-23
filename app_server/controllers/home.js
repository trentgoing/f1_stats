const request = require('request');
const apiOptions = {
  server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://peaceful-island-57907.herokuapp.com'
};

const home = function (req, res) {
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
        _showHome(req, res, body);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

/* Get Homepage */
const _showHome = function (req, res, responseBody) {
  res.render('index', { 
    last_race: responseBody[0].raceId,
    last_season: responseBody[0].year
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
  home
};
