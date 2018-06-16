import { EventEmitter } from '@angular/core';
//import { Stack } from './stack';
import * as d3 from 'd3';

const VARS = {
    N: 20,
    M: 200,
    K: 5,
    NArray: ['1', '2', '3', '4', '5', '6', '0', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']
}

export class Streamgraph {
    public area: d3.Area<any>;
    public stack: d3.Stack<any, any, any>;
    public layers0: d3.Series<any, any>[];
    public layers1: d3.Series<any, any>[];
    public layers: d3.Series<any, any>[];

    constructor(options: { width, height }) {
        
        this.initialize(options);
    }

    initialize(options) {
        //console.log('Window - ' + options.width + ':' + options.height);
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
            
        // Creating the stack and defining the layers
        var stack = d3.stack().keys(VARS.NArray).offset(d3.stackOffsetWiggle);
        this.stack = d3.stack().keys(VARS.NArray).offset(d3.stackOffsetWiggle);
        
        this.layers0 = this.stack(((VARS.NArray).map(function() { return bumps(VARS.M, VARS.K); })));
        this.layers1 = this.stack(((VARS.NArray).map(function() { return bumps(VARS.M, VARS.K); })));
        this.layers = this.layers0.concat(this.layers1);

        var svg = d3.select("svg#streamgraph"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var x = d3.scaleLinear()
            .domain([0, VARS.M - 1])
            .range([0, width]);

        var domain = [parseInt(d3.min(this.layers, stackMin)), parseInt(d3.max(this.layers, stackMax))];
        console.log(domain[0] + ' ' + domain[1] + ': ' + typeof(domain[0]) + ' ' + typeof(domain[1]));

        var y = d3.scaleLinear()
            .domain(domain)
            .range([height, 0]);
        
        var z = d3.interpolateCool;

        this.area = d3.area()
            .x(function(d, i) { return x(i); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); });

        console.log(this.layers0);

    //    svg.selectAll("path")
    //      .data(this.layers0)
    //      .enter().append("path")
    //        .attr("d", this.area)
    //        .attr("fill", function() { return z(Math.random()); });

        function stackMax(layer) {
          return d3.max(layer, function(d) { return d[1]; });
        }
        
        function stackMin(layer) {
          return d3.min(layer, function(d) { return d[0]; });
        }
        
        function transition() {
          var t;
          d3.selectAll("path")
            .data((t = this.layers1, this.layers1 = this.layers0, this.layers0 = t))
            .transition()
              .duration(2500)
              .attr("d", this.area);
        }

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
}


