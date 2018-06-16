import { Component, Input, OnInit } from '@angular/core';

import { Race, DriverStanding, ConstructorStanding } from '../race';

@Component({
  selector: 'app-season-standings',
  templateUrl: './season-standings.component.html',
  styleUrls: ['./season-standings.component.css']
})

export class SeasonStandingsComponent implements OnInit {

  @Input() WCCStandings: ConstructorStanding[];
  @Input() WDCStandings: DriverStanding[]; 

  radioModel = 'Drivers';

  constructor() { }

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
