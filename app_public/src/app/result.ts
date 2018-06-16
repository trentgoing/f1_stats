export class Result {
  _id: number;
  raceId: number;
  driverId: number;
  constructorId: number;
  number: number;
  position: number;
  grid: number;
  positionText: string;
  positionOrder: number;
  points: number;
  laps: number;
  time: string;
  milliseconds: number;
  fastestLap: number;
  rank: number;
  fastestLapTime: string;
  fastestLapSpeed: string;
  statusId: number;
  team: Team;
  driver: Driver;
}

export class Team {
  _id: number;
  name: string;
  nationality: string;
  url: string;
}

export class Driver {
  _id: number;
  number: number;
  surname: string;
  forename: string;
  driverRef: string;
  code: string;
  dob: string;
  nationality: string;
  url: string;
}
