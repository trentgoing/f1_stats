/* Get Homepage */
const index = function (req, res) {
  res.render('index', { title: 'F1 Encyclopedia' });
};


module.exports = {
  index
};
