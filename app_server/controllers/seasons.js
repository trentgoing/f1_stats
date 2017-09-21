/* Get Season Index */
const index = function (req, res) {
  res.render('season-index', { title: 'Seasons' });
};

/* Get Season Info */
const seasonInfo = function (req, res) {
  res.render('season-info', { title: 'Season Information' });
};


module.exports = {
  index,
  seasonInfo
};
