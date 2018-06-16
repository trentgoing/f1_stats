import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'g[areaVisual]',
  templateUrl: './area-visual.component.html',
  styleUrls: ['./area-visual.component.css']
})
export class AreaVisualComponent implements OnInit {

  @Input('areaVisual') area: d3.Area<any[]>;

  constructor() {
    console.log('area constructed');
  }

  ngOnInit() {
    console.log('area OnInit');
    console.log(this.area);
  }

}
