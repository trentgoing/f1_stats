/* Get circuit Index */
const index = function (req, res) {
  res.render('circuit-index', { title: 'circuits' });
};

/* Get circuit Info */
const circuitInfo = function (req, res) {
  res.render('circuit-info', { title: 'circuit Information' });
};


module.exports = {
  index,
  circuitInfo
};
