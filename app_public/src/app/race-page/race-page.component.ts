import { Component, OnInit } from '@angular/core';
import { F1DataService } from '../f1-data.service';

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
  selector: 'app-race-page',
  templateUrl: './race-page.component.html',
  styleUrls: ['./race-page.component.css'],
  providers: [F1DataService]
})

export class RacePageComponent implements OnInit {

  constructor(private f1DataService: F1DataService) { }

  races: Race[];

  private getRaces(): void {
    this.f1DataService
      .getRaces()
        .then(foundRaces => {
          this.races = foundRaces;
        });
  }

  ngOnInit() {
    this.getRaces();
  }

}
