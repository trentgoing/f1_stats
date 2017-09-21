/* Get Team Index */
const index = function (req, res) {
  res.render('team-index', { title: 'Teams' });
};

/* Get Team Info */
const teamInfo = function (req, res) {
  res.render('team-info', { title: 'Team Information' });
};


module.exports = {
  index,
  teamInfo
};
