/* Get Homepage */
const home = function (req, res) {
  res.render('index', { title: 'F1 Encyclopedia' });
};


module.exports = {
  home
};
