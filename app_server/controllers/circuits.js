/* Get circuit Index */
const index = function (req, res) {
  res.render('circuit-index', { 
    title: 'circuits' 
  });
};

/* Get circuit Info */
const circuitInfo = function (req, res) {
  res.render('circuit-info', { 
    title: 'Circuit Information', 
    circuit: {
      name: "Circuit of the Americas",
      location: 'Austin, TX USA',
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


module.exports = {
  index,
  circuitInfo
};
