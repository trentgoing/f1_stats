/* Get Season Info */
const seasonInfo = function (req, res) {
  res.render('season-info', { 
    title: '2017 Season',
    year: '2017',
    driver_standings: [
      {
        name: 'Hamilton',
        place: 1,
        team: 'Mercedes AMG Petronas',
        points: 124,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        name: 'Ricciardo',
        place: 2,
        team: 'Red Bull Racing',
        points: 122,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        name: 'Bottas',
        place: 3,
        team: 'Mercedes AMG Petronas',
        points: 111,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        name: 'Perez',
        place: 4,
        team: 'Sarhara Force India',
        points: 104,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        name: 'Ocon',
        place: 5,
        team: 'Sarhara Force India',
        points: 94,
        finishes: [4, 1, 2, 1, 0, 1]
      }],
    team_standings: [
      {
        place: 1,
        name: 'Mercedes',
        points: 124,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        place: 2,
        name: 'Red Bull Racing',
        points: 122,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        place: 3,
        name: 'Ferarri',
        points: 111,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        place: 4,
        name: 'Sarhara Force India',
        points: 104,
        finishes: [4, 1, 2, 1, 0, 1]
      },
      {
        place: 5,
        name: 'Renault',
        points: 94,
        finishes: [4, 1, 2, 1, 0, 1]
      }],
  });
};

/* Get Season Index */
const index = function (req, res) {
  res.render('season-index', { title: 'Season Index' });
};


module.exports = {
  index,
  seasonInfo
};
