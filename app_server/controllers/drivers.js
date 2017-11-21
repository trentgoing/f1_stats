/* Get Driver Index */
const index = function (req, res) {
  res.render('drivers-index', { 
    title: 'Drivers'
  });
};

/* Get Driver Info */
const driverInfo = function (req, res) {
  res.render('drivers-info', { 
    title: 'Driver Information',
    driver: {
      name: "Sebastian Vettel",
      country: 'Germany',
      birth_year: '3/7/897',
      current_season: {
        year: 2017,
        standing: 2,
        points: 285,
        team: 'Ferarri',
        races: [
          {
            race: 'Australia',
            finish: 1,
            team: 'Ferarri',
            start: 4,
            qual: 4,
            fast_lap: '1:18.490',
            pits: [35]
          },
          {
            race: 'Bahrain',
            finish: 3,
            team: 'Ferarri',
            start: 4,
            qual: 4,
            fast_lap: '1:18.490',
            pits: [35]
          },
          {
            race: 'Canada',
            finish: 2,
            team: 'Ferarri',
            start: 4,
            qual: 4,
            fast_lap: '1:18.490',
            pits: [35]
          },
        ]
      },
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


module.exports = {
  index,
  driverInfo
};
