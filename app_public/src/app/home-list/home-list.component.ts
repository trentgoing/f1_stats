import { Component, OnInit } from '@angular/core';
import { F1DataService } from '../f1-data.service';

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
}

export class Race {
  _id: number;
  year: number;
  round: number;
  circuitId: number;
  name: string;
  date: string;
  time: string;
  url: string;
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css'],
  providers: [F1DataService]
})
export class HomeListComponent implements OnInit {

  constructor(private f1DataService: F1DataService) { }

  race: Race;
  results: Result[];

  drivers: Driver[];

  team: Team[];

  public getStyleOrdinal(position) {
    if (position === 1) {
      return "badge badge-pill float-right badge-first";
    } else if (position === 2) {
      return "badge badge-pill float-right badge-second";
    } else if (position === 3) {
      return "badge badge-pill float-right badge-third";
    } else {
      return "badge badge-pill float-right";
    }
  }

  ngOnInit() {

  }

}
