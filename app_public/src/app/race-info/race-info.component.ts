import { Component, OnInit } from '@angular/core';
import { F1DataService } from '../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


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
  circuit: {
    name: string;
  };
  results: [Result]
}

@Component({
  selector: 'app-race-info',
  templateUrl: './race-info.component.html',
  styleUrls: ['./race-info.component.css'],
  providers: [F1DataService]
})
export class RaceInfoComponent implements OnInit {

  constructor(
    private f1DataService: F1DataService,
    private route: ActivatedRoute
  ) { }

  race: Race;
  results: Result[];
  newResults: Result[];

  private getRace(race: any): void {
    const race_id: string = '970';
    this.f1DataService
      .getResults(race_id)
        .then(foundResults => {
          this.results = foundResults;
        });
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('raceId');
        return this.f1DataService.getRace(id);
      })
      .subscribe((newRace: Race) => {
        this.newResults = newRace.results 
        this.pageContent.header.name = newRace.name;
        this.pageContent.header.year = String(newRace.year);
        this.pageContent.info.location = newRace.circuit.name;
        try {
          this.pageContent.info.lap_count = String(newRace.results[0].laps);
        } catch (e){
          if(e instanceof TypeError){
            console.log('No laps run');
          }
        }
      });
  }

  pageContent = {
    header : {
      name: 'Race Name',
      year: '2017'
    },
    info : {
      location: 'Circuit',
      lap_count: ''
    },
  }

}
