import { Component, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { Streamgraph } from '../../d3/models'
import { D3Service } from '../../d3/d3.service';
import { F1DataService } from '../../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router'; 
import 'rxjs/add/operator/switchMap';

import { LapTime } from '../../race';

import * as d3 from 'd3';

const VARS = {
    N: 10,
    M: 75,
    K: 20,
    NumArray: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
}

@Component({
  selector: 'app-streamgraph',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./streamgraph.component.html`,
  styleUrls: ['./streamgraph.component.css'],
  providers: [F1DataService]
})

export class StreamgraphComponent implements OnInit {
  //@Input() areas: d3.Area<any[]>[];
  graph: Streamgraph;
  public area: d3.Area<any>;
  public stack: d3.Stack<any, any, any>;
  public layers0: d3.Series<any, any>[];
  public layers1: d3.Series<any, any>[];
  public layers: d3.Series<any, any>[];

  private _options: { width, height } = { width: 200, height: 150 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initialize(this.options);
  }

  constructor(
    private d3Service: D3Service, 
    private ref: ChangeDetectorRef,
    private f1DataService: F1DataService,
    private route: ActivatedRoute
  ) { }
  
  lapTimes: object[];
  
  ngOnInit(): void {
   
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('raceId');
        return this.f1DataService.getRaceLapTimes(id);
      })
      .subscribe((newLapTimes: LapTime[]) => {
        console.log(newLapTimes);
        //need to go from format of single array of objects of a lap for a driver 
        //   to an object of lap objects where each driver_id is a key to their time in MS for that lap
        try {
          //this.pageContent.info.lap_count = String(newRace.results[0].laps);
        } catch (e){
          if(e instanceof TypeError){
            console.log('No laps run');
          }
        }
      });
    
    if (!this.options || !this.options.width || !this.options.height) {
      throw new Error('missing options when initializing simulation');
    }
    
    // Creating the stack and defining the layers
    this.stack = d3.stack().keys(VARS.NumArray.slice(0, VARS.N)).offset(d3.stackOffsetNone);
    this.layers0 = this.stack(d3.range(VARS.M).slice(0, VARS.M).map(function() { return bumps(VARS.N, VARS.K); }));
    this.layers1 = this.stack(VARS.NumArray.slice(0, VARS.M).map(function() { return bumps(VARS.N, VARS.K); }));
    this.layers = this.layers0.concat(this.layers1);

    console.log('N=' + VARS.N + ", M=" + VARS.M + ", K= " + VARS.K);
    console.log(d3.range(VARS.M).slice(0, VARS.M).map(function() { return bumps(VARS.N, VARS.K); }));
    console.log(this.layers0);

    function bumps(n, m) {
      var a = {}, i;
      for (i = 0; i < n; ++i) a[i] = 0;
      for (i = 0; i < m; ++i) bump(a, n);
      return a;
    }

    function bump(a, n) {
      var x = 1 / (0.1 + Math.random()),
          y = 2 * Math.random() - 0.5,
          z = 10 / (0.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

  }

  ngAfterViewInit() {

    var svg = d3.select("svg#streamgraph"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

    var x = d3.scaleLinear()
      .domain([0, VARS.M - 1])
      .range([0, width]);

    var domain = [parseInt(d3.min(this.layers, stackMin)), parseInt(d3.max(this.layers, stackMax))];

    var y = d3.scaleLinear()
      .domain(domain)
      .range([height, 0]);
    
    var z = d3.interpolateCool;

    this.area = d3.area()
      .x(function(d, i) { return x(i); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); });

    svg.selectAll("path")
      .data(this.layers0)
      .enter().append("path")
        .attr("d", this.area)
        .attr("fill", function() { return z(Math.random()); });
    
    function transition() {
      var t;
      d3.selectAll("path")
        .data((t = this.layers1, this.layers1 = this.layers0, this.layers0 = t))
        .transition()
          .duration(2500)
          .attr("d", this.area);
    }

    function stackMax(layer) {
      return d3.max(layer, function(d) { return d[1]; });
    }
    
    function stackMin(layer) {
      return d3.min(layer, function(d) { return d[0]; });
    }

  }

  get options() {
    return this._options = {
      height: window.innerHeight * (3/5),
      width: document.getElementById("laptimes").parentElement.clientWidth
    };
  }

}
