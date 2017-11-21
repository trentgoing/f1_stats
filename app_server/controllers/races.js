/* Get Race Info */
const raceInfo = function (req, res) {
  res.render('race', { 
    title: 'Race Information',
    race_name: 'Singapore',
    race_year: '2017',
    fastest_lap: '1:18.450',
    circuit: {
      name: 'Marina Bay Street Circuit',
      link: '/circuit',
      laps: 58,
      lap_record: '1:18.490'
    },
    results: [
      {
        name: 'Hamilton',
        finish: 1,
        team: 'Mercedes AMG Petronas',
        start: 4,
        qual: 4,
        fast_lap: '1:18.490',
        pits: [35]
      },
      {
        name: 'Ricciardo',
        finish: 2,
        team: 'Red Bull Racing',
        start: 5,
        qual: 5,
        fast_lap: '1:19.000',
        pits: [35]
      },
      {
        name: 'Bottas',
        finish: 3,
        team: 'Mercedes AMG Petronas',
        start: 6,
        qual: 6,
        fast_lap: '1:18.450',
        pits: [40]
      },
      {
        name: 'Perez',
        finish: 4,
        team: 'Sarhara Force India',
        start: 8,
        qual: 8,
        fast_lap: '1:21.490',
        pits: [2, 40]
      },
      {
        name: 'Ocon',
        finish: 5,
        team: 'Sarhara Force India',
        start:14,
        qual: 11,
        fast_lap: '1:22.490',
        pits: [13]
      }],
    race_data: {
      lap_1: {
        lap: 1,
        race_time: '00:00:00.000',
        fastest: '1:20.999',
        average: '1:20.999',
        drivers: [
        {
          name: 'Vettel',
          position: 1,
          lap_time: '1:20.999',
        },
        {
          name: 'Verstappen',
          position: 2,
          lap_time: '1:20.999',
        },
        {
          name:'Raikkonen',
          position: 3,
          lap_time: '1:20.999',
        }]
      },
      lap_2: {
        lap: 2,
        race_time: '00:01:20.999',
        fastest: '1:20.999',
        average: '1:20.999',
        drivers: [
        {
          name: 'Hamilton',          
          position: 1,
          lap_time: '1:20.999',
        },
        {
          name: 'Ricciardo',
          position: 2,
          lap_time: '1:20.999',
        },
        {
          name:'Bottas',
          position: 3,
          lap_time: '1:20.999',
        }]
      }
    }
  });
};


module.exports = {
  raceInfo
};
