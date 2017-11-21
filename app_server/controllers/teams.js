/* Get Team Index */
const index = function (req, res) {
  res.render('team-index', { title: 'Teams' });
};

/* Get Team Info */
const teamInfo = function (req, res) {
  res.render('team-info', { 
    title: 'Team Information',
    team: {
      name: "Ferarri",
      location: "Maranello, Italy",
      first_year: 1950,
      overall: {
        seasons: 67,
        wcc: 16,
        best_wcc: "1 (x16)",
        points: 5000,
        grands_prix: 500,
        pole_pos: 200, 
        best_finish: "1 (x299)"
      },
      current_season: {
        year: 2017,
        standing: 2,
        points: 285,
        team_chief: "Maurizio Arrivabene",
        tech_chief: "Mattia Binotto",
        drivers: ['Sebastian Vettel', 'Kimi Raikkonen'],
        chassis: 'SF70H',
        races: [
          {
            race: 'Australia',
            points: 40,
            driver_1: 'Sebastian Vettel',
            finish_1: 1,
            start_1: 4,
            qual_1: 4,
            pits_1: [35],
            driver_2: 'Kimi Raikkonen',
            finish_2: 4,
            start_2: 5,
            qual_2: 5,
            fast_lap: '1:19.370',
            pits_2: [37]
          },
          {
            race: 'Bahrain',
            points: 35,
            driver_1: 'Sebastian Vettel',
            finish_1: 2,
            start_1: 2,
            qual_1: 2,
            pits_1: [35],
            driver_2: 'Kimi Raikkonen',
            finish_2: 3,
            start_2: 5,
            qual_2: 5,
            fast_lap: '1:19.370',
            pits_2: [37]
          },
          {
            race: 'Canada',
            points: 25,
            driver_1: 'Sebastian Vettel',
            finish_1: 1,
            start_1: 1,
            qual_1: 1,
            pits_1: [35],
            driver_2: 'Kimi Raikkonen',
            finish_2: 0,
            start_2: 3,
            qual_2: 4,
            fast_lap: '1:19.370',
            pits_2: [37]
          },
        ]
      },
      full_history: [
        {
          season: 2010,
          points: 124,
          finish: 3,
          podiums: 3,
          grands_prix: 20,
          drivers: [
            {
              name:'Sebastian Vettel',
              finish: 1
            },
            {
              name:'Kimi Raikkonen',
              finish: 2
            },
          ]
        },
        {
          season: 2011,
          points: 224,
          finish: 4,
          podiums: 6,
          grands_prix: 20,
          drivers: [
            {
              name:'Sebastian Vettel',
              finish: 1
            },
            {
              name:'Kimi Raikkonen',
              finish: 2
            },
          ]
        }
      ]
    }
  });
};


module.exports = {
  index,
  teamInfo
};
