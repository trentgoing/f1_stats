import { Result, Driver, Team } from './result';

export class Race {
  _id: number;
  year: number;
  round: number;
  circuitId: number;
  name: string;
  date: string;
  time: string;
  url: string;
  circuit: {
    name: string;
  };
  results: [Result];
  driverStandings: [DriverStanding];
  constructorStandings: [ConstructorStanding];
}

export class DriverStanding {
  _id: number;
  raceId: number;
  driverId: number;
  points: number;
  position: number;
  positionText: string;
  wins: number;
  driver: Driver;
}

export class ConstructorStanding {
  _id: number;
  raceId: number;
  constructorId: number;
  points: number;
  position: number;
  positionText: string;
  wins: number;
  team: Team;
}

export class LapTime {
  _id: number;
  raceId: number;
  driverId: number;
  lap: number;
  position: number;
  time: string;
  milliseconds: number;
  driver: Driver;
}
