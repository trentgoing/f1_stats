import { Component, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
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

  graph: Streamgraph;
  lapTimes: object[];
  public selected: any = "Ricciardo";
  public area: d3.Area<any>;
  public stack: d3.Stack<any, any, any>;
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
  

  
  ngOnInit(): void {
   
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('raceId');
        return this.f1DataService.getRaceLapTimes(id);
      })
      .subscribe((newLapTimes: LapTime[]) => {

        let drivers = Object.keys(newLapTimes[0]).slice(1);
        let selectedLocal = this.selected;

        this.layers = myStack(newLapTimes, selectedLocal, drivers);

        try {
          var svg = d3.select("svg#streamgraph"),
            width = +svg.attr("width"),
            height = +svg.attr("height");
      
          var x = d3.scaleLinear()
            .domain([0, newLapTimes.length -2])
            .range([0, width]);
      
          var domain = [parseInt(d3.min(this.layers, stackMin)), parseInt(d3.max(this.layers, stackMax))];
      
          var y = d3.scaleLinear()
            .domain(domain)
            .range([height, 0]);
          
          var z = d3.interpolateRainbow;

          var xAxis = d3.axisBottom(x)
            .ticks(d3.timeYears, 5);

          var chartLocation = document.getElementById("laptimes").parentElement.getBoundingClientRect();
          var leftOfChart = chartLocation.top;
          var topOfChart = chartLocation.left;
          console.log(topOfChart + ', ' + leftOfChart);

          var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tip")
            .style("position", "absolute")
            .style("z-index", "20")
            .style("visibility", "hidden")
            .style("top", topOfChart + "px")
      
          this.area = d3.area()
            .x(function(d, i) { return x(i); })
            .y0(function(d) { return y(d[0]); }) //return y(0); })//
            .y1(function(d) { return y(d[1]); });
      
          svg.selectAll("path")
            .data(this.layers)
            .enter().append("path")
              .attr("d", this.area)
              .attr("fill", function() { return z(Math.random()); })
            .append("title")
              .text(function(d) { return d.key; });
            //this.pageContent.info.lap_count = String(newRace.results[0].laps);

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

          svg.selectAll("path")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
              console.log(d);
              svg.selectAll("path").transition()
                .duration(100)
                .attr("opacity", function(d, j) {
                  return j != i ? 0.4 : 1;
            })})
            .on("mousemove", function(d: any[], i) {

              var color = d3.select(this).style('fill'); // need to know the color in order to generate the swatch
              let mouse = d3.mouse(this);
              let mousex = mouse[0];
              console.log(mouse);
              var invertedx = x.invert(mousex);
              var xLap = Math.floor(invertedx);
              var currentDriver = d.key;
              d.forEach(function(f, i){
                var gapDown = (f[1] - f[0]) / 1000;
                var gapToLeader = (f[1] - 0) / 1000;
                var lap = Math.ceil(i / 2 + 1);
                if (xLap == lap){
                    tooltip
                      .style("left", mousex + topOfChart + "px")
                      .html( "<div class='driver'>Lap: " + lap + "</div><div class='key'><div style='background:" + color + "' class='swatch'>&nbsp;</div>" + currentDriver + "</div><div class='value'>" + gapDown + " gap down</div><div class='value'>" + gapToLeader + " gap to leader</div>" )
                      .style("visibility", "visible");
                }
              });
            })
            .on("mouseout", function(d, i) {
        svg.selectAll("path").transition()
            .duration(100)
            .attr("opacity", '1');
          tooltip.style("visibility", "hidden");
      });

        } catch (e){
          if(e instanceof TypeError){
            console.log(e);
          }
        }
      });
    
    if (!this.options || !this.options.width || !this.options.height) {
      throw new Error('missing options when initializing simulation');
    }



    function myStack(data, inFocus: string, selection: string[]) {
      var laps = data.length,
          n = selection.length,
          layers = new Array(n),
          oz,
          lap;

      for (lap = 0; lap < (laps); ++lap) {
        let sortedDrivers = [];
        selection.forEach(function(driver){
          sortedDrivers.push([driver, data[lap][driver]]);
        });
        sortedDrivers.sort(function(a, b){
          if (a[1] === 0) {
            return 1;
          } else if (b[1] === 0) {
            return -1;
          }
          return a[1] - b[1];
        });
        for (var i = 0; i < n; ++i) {
          var driver = selection[i],
              layerDriverRace = layers[i],
              sij;

          if (lap === 0) {
            layerDriverRace = new Array(laps * 2);
            layerDriverRace['key'] = driver;
          }
          var position = 0;
          sortedDrivers.forEach(function(item, index) {
            if (item[0] === driver) {
              position = index;
            }
          });
          var leaderTime = data[lap][sortedDrivers[0][0]];
          if (position !== 0) {
            var aheadTime : number = data[lap][sortedDrivers[position - 1][0]];
          } else {
            var aheadTime = data[lap][sortedDrivers[position][0]] - 3000;
          }
          var driverTime = data[lap][sortedDrivers[position][0]];
          if (aheadTime === 0 || driverTime === 0) {
            var gapHolder = [(layerDriverRace[lap - 1][0]), (layerDriverRace[lap - 1][0])];
            layerDriverRace[lap * 2] = sij = gapHolder;
            layerDriverRace[lap * 2 + 1] = sij = gapHolder;
          } else {
            var gapHolderToo = [(aheadTime - leaderTime), (driverTime - leaderTime)];
            layerDriverRace[lap * 2] = sij = gapHolderToo;
            layerDriverRace[lap * 2 + 1] = sij = gapHolderToo;
          }
          sij.data = data[lap];
          layers[i] = layerDriverRace;
        }
      }

      for (var i = 0; i < n; ++i) {
        layers[i].index = i;
      }

     return layers;
    }

    function stackMax(layer) {
      return d3.max(layer, function(d) { return d[1]; });
    }
    
    function stackMin(layer) {
      return d3.min(layer, function(d) { return d[0]; });
    }

    function transition() {
      var t;
      d3.selectAll("path")
        .data((t = this.layers2, this.layers2 = this.layers0, this.layers0 = t))
        .transition()
          .duration(2500)
          .attr("d", this.area);
    }

  }

  ngAfterViewInit() {
  }

  get options() {
    return this._options = {
      height: window.innerHeight * (3/5),
      width: document.getElementById("laptimes").parentElement.clientWidth
    };
  }


}
