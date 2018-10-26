import { Component, OnInit, OnChanges, SimpleChange, ChangeDetectionStrategy, HostListener, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { Streamgraph } from '../../d3/models'
import { D3Service } from '../../d3/d3.service';
import { F1DataService } from '../../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router'; 
import 'rxjs/add/operator/switchMap';

import { LapTime } from '../../race';

import * as d3 from 'd3'; 

@Component({
  selector: 'app-streamgraph',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./streamgraph.component.html`,
  styleUrls: ['./streamgraph.component.css'],
  providers: [F1DataService]
})

export class StreamgraphComponent implements OnInit {

  @Input() selected: string[];

  graph: Streamgraph;
  lapTimes: LapTime[];
  public area: d3.Area<any>;
  public stack: d3.Stack<any, any, any>;
  public layers: d3.Series<any, any>[];
  private _options: { width, height } = { width: 200, height: 150 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.graph) {
      let selectedLocal = this.selected;
      if (selectedLocal.length === 0) {
        selectedLocal = Object.keys(this.lapTimes[0]).slice(1);
      }
      this.graph.initialize(this.lapTimes, selectedLocal, this.options);
    }
  }

  constructor(
    private d3Service: D3Service, 
    private ref: ChangeDetectorRef,
    private f1DataService: F1DataService,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('raceId');
        return this.f1DataService.getRaceLapTimes(id);
      })
      .subscribe((newLapTimes: LapTime[]) => {
        this.lapTimes = newLapTimes;
        let selectedLocal = this.selected;
        if (selectedLocal.length === 0) {
          selectedLocal = Object.keys(newLapTimes[0]).slice(1);
        }
        this.graph = this.d3Service.getStreamgraph(this.lapTimes, selectedLocal, this.options);
      })
  }
 
  ngOnChanges() {
    if (this.graph) {
      let selectedLocal = this.selected;
      if (selectedLocal.length === 0) {
        selectedLocal = Object.keys(this.lapTimes[0]).slice(1);
      }
      this.graph.initialize(this.lapTimes, selectedLocal, this.options);
    }
  }

  ngAfterViewInit() {
  }

  get options() {
    return this._options = {
      height: window.innerHeight * (3/5),
      width: document.getElementById("laptimes").parentElement.clientWidth,
    };
  }


}
