/* Get Race Info */
const raceInfo = function (req, res) {
  res.render('race', { title: 'Race Information' });
};


module.exports = {
  raceInfo
};
