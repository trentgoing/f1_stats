/* Get Driver Index */
const index = function (req, res) {
  res.render('drivers-index', { title: 'Drivers' });
};

/* Get Driver Info */
const driverInfo = function (req, res) {
  res.render('drivers-info', { title: 'Driver Information' });
};


module.exports = {
  index,
  driverInfo
};
