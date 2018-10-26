import { EventEmitter } from '@angular/core';
import RACE_CONFIG from '../../race-info/race-info.config';
//import { Stack } from './stack';
import * as d3 from 'd3';


export class Streamgraph {
    public area: d3.Area<any>;
    public stack: d3.Stack<any, any, any>;
    public layers0: d3.Series<any, any>[];
    public layers1: d3.Series<any, any>[];
    public layers: d3.Series<any, any>[];

    constructor(lapTimes, selected, options: { width, height }) {
        
        this.initialize(lapTimes, selected, options);
    }

    initialize(lapTimes, selected, options) {
        //console.log('Window - ' + options.width + ':' + options.height);
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
            
        // Creating the stack and defining the layers
        this.layers = this.myStack(lapTimes, selected);

        try {
          var svg = d3.select("svg#streamgraph"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

          svg.selectAll("path")
            .remove();
          svg.selectAll("g")
            .remove();
          d3.selectAll(".remove")
            .remove();

          var tool = document.getElementById("tip");
          if (tool) {
            tool.remove();
          }

          var domain = [parseInt(d3.min(this.layers, this.stackMin)), parseInt(d3.max(this.layers, this.stackMax))];

          var x = d3.scaleLinear()
            .domain([0, lapTimes.length * 2])
            .range([0, width]);
      
          
          var y = d3.scaleLinear()
            .domain(domain)
            .range([0 , height]);
          
          var z = d3.interpolateRainbow;


          var xAxis = d3.axisTop(x)
            .ticks(d3.timeYears, 5);

          var chartLocation = document.getElementById("streamgraph").parentElement.getBoundingClientRect();
          var leftOfChart = chartLocation.left;
          var topOfChart = chartLocation.top;
          var bottomOfChart = chartLocation.bottom;

          var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tip")
            .attr("id", "tip")
            .style("position", "absolute")
            .style("z-index", "20")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("color", "black")
            .style("border-radius", "5px")
            .style("opacity", "0.75")
            .style("top", (bottomOfChart - 150) + "px")
      
          this.area = d3.area()
            .x(function(d, i) { return x(i); })
            .y0(function(d) { return y(d[0]); }) //return y(0); })//
            .y1(function(d) { return y(d[1]); });

          svg.selectAll("path")
            .data(this.layers)
            .enter().append("path")
              .attr("d", this.area)
              .attr("fill", function(d) {
                let color = RACE_CONFIG.DRIVER_COLORS[d.key];
                if (color) {
                  return color;
                } else {
                  return z(Math.random());
                }
              });

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

          svg.selectAll("path")
            .attr("opacity", 1)
            .on("mouseover", function(d, i) {
              svg.selectAll("path").transition()
                .duration(100)
                .attr("opacity", function(d, j) {
                  return j != i ? 0.4 : 1;
            })})
            .on("mousemove", function(d: any[], i) {

              var color = d3.select(this).style('fill'); // need to know the color in order to generate the swatch
              let mouse:any = d3.mouse(this);
              var mousex = mouse[0];
              var invertedx = x.invert(mousex);
              var xLap = Math.floor(invertedx);
              var currentDriver = d.key;
              d.forEach(function(f, i){
                var gapDown: any;
                if (f[1] === 0) {
                  gapDown = cleanTime(0);
                } else {
                  gapDown = cleanTime(f[1] - f[0]);
                }
                var gapToLeader:any = cleanTime(f[1] - 0);
                var lap = Math.ceil(i / 2 + 1);
                if (xLap/2 == lap){
                    tooltip
                      .style("left", (mousex + leftOfChart + 10) + "px")
                      .html( "<div class='driver'>Lap: " + lap + "</div><div class='key'><div style='background:" + color + "' class='swatch'>&nbsp;</div>" + currentDriver + "</div><div class='value'>" + gapDown + " gap down</div><div class='value'>" + gapToLeader + " gap to leader</div>" )
                      .style("visibility", "visible");
                }

                function cleanTime(milliseconds) {
                  let time:any = milliseconds;
                  let millis = (time % 1000).toString();
                  while (millis.length < 3) {
                    millis = '0' + millis;
                  }
                  time = Math.floor(time / 1000);
                  let seconds = (time % 60).toString();
                  while (seconds.length < 2) {
                    seconds = '0' + seconds;
                  }
                  time = Math.floor(time / 60);
                  return time + ':' + seconds + '.' + millis;
                }

              });
            })
            .on("mouseout", function(d, i) {
              svg.selectAll("path").transition()
                  .duration(100)
                  .attr("opacity", '1');
                tooltip.style("visibility", "hidden");
            });

          var vertical1 = d3.select("#laptimes")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "2px")
            .style("height", height + "px")
            .style("bottom", "10px")
            .style("left", "0px")
            .style("background", "#fcfcfc");

          var vertical2 = d3.select("#laptimes")
            .append("div")
            .attr("class", "remove")
            .style("position", "absolute")
            .style("z-index", "19")
            .style("width", "2px")
            .style("height", height + "px")
            .style("bottom", "10px")
            .style("left", "0px")
            .style("background", "#fcfcfc");

          d3.select("svg#streamgraph")
            .on("mousemove", function(){
              let mousex:any = d3.mouse(this);
              mousex = mousex[0];
              vertical1.style("left", mousex + 5 + "px" );
              vertical2.style("left", mousex - 5 + "px" )})
            .on("mouseover", function(){
              let mousex:any = d3.mouse(this);
              mousex = mousex[0];
              vertical1.style("left", mousex + 5 + "px");
              vertical2.style("left", mousex - 5 + "px" )})

        } catch (e){
          if(e instanceof TypeError){
            console.log(e);
          }
        }
    }



    myStack(data, selection: string[]) {
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

    stackMax(layer) {
      return d3.max(layer, function(d) { return d[1]; });
    }
    
    stackMin(layer) {
      return d3.min(layer, function(d) { return d[0]; });
    }



}



