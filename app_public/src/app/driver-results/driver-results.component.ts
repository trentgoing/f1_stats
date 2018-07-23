import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { Result } from '../result';
import { Race } from '../race';

@Component({
  selector: 'app-driver-results',
  templateUrl: './driver-results.component.html',
  styleUrls: ['./driver-results.component.css']
})

export class DriverResultsComponent implements OnInit {

  @Input() results: Result[];
  public selected: string[] = [];
  @Output('update') changeInSelected: EventEmitter<string[]> = new EventEmitter<string[]>();

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

  toggleSelectedDrivers(driverName: string) {
    let index = this.selected.indexOf(driverName);
    if (index === -1) {
      this.selected.push(driverName);
    } else {
      this.selected.splice(index, 1)
    }
    this.changeInSelected.emit(this.selected);
  }

}
