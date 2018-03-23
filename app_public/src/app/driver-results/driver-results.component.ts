import { Component, Input, OnInit } from '@angular/core';
import { F1DataService } from '../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Driver, Result, Team, Race } from '../race-info/race-info.component';

@Component({
  selector: 'app-driver-results',
  templateUrl: './driver-results.component.html',
  styleUrls: ['./driver-results.component.css'],
  providers: [F1DataService]
})

export class DriverResultsComponent implements OnInit {

  @Input() results: Result[];

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
