var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import { D3Service } from '../../d3/d3.service';
import { F1DataService } from '../../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import * as d3 from 'd3';
var StreamgraphComponent = /** @class */ (function () {
    function StreamgraphComponent(d3Service, ref, f1DataService, route) {
        this.d3Service = d3Service;
        this.ref = ref;
        this.f1DataService = f1DataService;
        this.route = route;
        this.selected = "Ricciardo";
        this._options = { width: 200, height: 150 };
    }
    StreamgraphComponent.prototype.onResize = function (event) {
        this.graph.initialize(this.options);
    };
    StreamgraphComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            var id = params.get('raceId');
            return _this.f1DataService.getRaceLapTimes(id);
        })
            .subscribe(function (newLapTimes) {
            var drivers = Object.keys(newLapTimes[0]).slice(1);
            var selectedLocal = _this.selected;
            _this.layers = myStack(newLapTimes, selectedLocal, drivers);
            try {
                var svg = d3.select("svg#streamgraph"), width = +svg.attr("width"), height = +svg.attr("height");
                var x = d3.scaleLinear()
                    .domain([0, newLapTimes.length - 2])
                    .range([0, width]);
                var domain = [parseInt(d3.min(_this.layers, stackMin)), parseInt(d3.max(_this.layers, stackMax))];
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
                    .style("top", topOfChart + "px");
                _this.area = d3.area()
                    .x(function (d, i) { return x(i); })
                    .y0(function (d) { return y(d[0]); }) //return y(0); })//
                    .y1(function (d) { return y(d[1]); });
                svg.selectAll("path")
                    .data(_this.layers)
                    .enter().append("path")
                    .attr("d", _this.area)
                    .attr("fill", function () { return z(Math.random()); })
                    .append("title")
                    .text(function (d) { return d.key; });
                //this.pageContent.info.lap_count = String(newRace.results[0].laps);
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                svg.selectAll("path")
                    .attr("opacity", 1)
                    .on("mouseover", function (d, i) {
                    console.log(d);
                    svg.selectAll("path").transition()
                        .duration(100)
                        .attr("opacity", function (d, j) {
                        return j != i ? 0.4 : 1;
                    });
                })
                    .on("mousemove", function (d, i) {
                    var color = d3.select(this).style('fill'); // need to know the color in order to generate the swatch
                    var mouse = d3.mouse(this);
                    var mousex = mouse[0];
                    console.log(mouse);
                    var invertedx = x.invert(mousex);
                    var xLap = Math.floor(invertedx);
                    var currentDriver = d.key;
                    d.forEach(function (f, i) {
                        var gapDown = (f[1] - f[0]) / 1000;
                        var gapToLeader = (f[1] - 0) / 1000;
                        var lap = Math.ceil(i / 2 + 1);
                        if (xLap == lap) {
                            tooltip
                                .style("left", mousex + topOfChart + "px")
                                .html("<div class='driver'>Lap: " + lap + "</div><div class='key'><div style='background:" + color + "' class='swatch'>&nbsp;</div>" + currentDriver + "</div><div class='value'>" + gapDown + " gap</div> )
                                .style("visibility", "visible"));
                        }
                    });
                });
            }
            catch (e) {
                if (e instanceof TypeError) {
                    console.log(e);
                }
            }
        });
        if (!this.options || !this.options.width || !this.options.height) {
            throw new Error('missing options when initializing simulation');
        }
        function myStack(data, inFocus, selection) {
            var laps = data.length, n = selection.length, layers = new Array(n), oz, lap;
            var _loop_1 = function () {
                var sortedDrivers = [];
                selection.forEach(function (driver) {
                    sortedDrivers.push([driver, data[lap][driver]]);
                });
                sortedDrivers.sort(function (a, b) {
                    if (a[1] === 0) {
                        return 1;
                    }
                    else if (b[1] === 0) {
                        return -1;
                    }
                    return a[1] - b[1];
                });
                for (var i = 0; i < n; ++i) {
                    driver = selection[i], layerDriverRace = layers[i];
                    if (lap === 0) {
                        layerDriverRace = new Array(laps * 2);
                        layerDriverRace['key'] = driver;
                    }
                    position = 0;
                    sortedDrivers.forEach(function (item, index) {
                        if (item[0] === driver) {
                            position = index;
                        }
                    });
                    leaderTime = data[lap][sortedDrivers[0][0]];
                    if (position !== 0) {
                        aheadTime = data[lap][sortedDrivers[position - 1][0]];
                    }
                    else {
                        aheadTime = data[lap][sortedDrivers[position][0]] - 3000;
                    }
                    driverTime = data[lap][sortedDrivers[position][0]];
                    if (aheadTime === 0 || driverTime === 0) {
                        gapHolder = [(layerDriverRace[lap - 1][0]), (layerDriverRace[lap - 1][0])];
                        layerDriverRace[lap * 2] = sij = gapHolder;
                        layerDriverRace[lap * 2 + 1] = sij = gapHolder;
                    }
                    else {
                        gapHolderToo = [(aheadTime - leaderTime), (driverTime - leaderTime)];
                        layerDriverRace[lap * 2] = sij = gapHolderToo;
                        layerDriverRace[lap * 2 + 1] = sij = gapHolderToo;
                    }
                    sij.data = data[lap];
                    layers[i] = layerDriverRace;
                }
            };
            var driver, layerDriverRace, sij, position, leaderTime, aheadTime, aheadTime, driverTime, gapHolder, gapHolderToo;
            for (lap = 0; lap < (laps); ++lap) {
                _loop_1();
            }
            for (var i = 0; i < n; ++i) {
                layers[i].index = i;
            }
            return layers;
        }
        function stackMax(layer) {
            return d3.max(layer, function (d) { return d[1]; });
        }
        function stackMin(layer) {
            return d3.min(layer, function (d) { return d[0]; });
        }
        function transition() {
            var t;
            d3.selectAll("path")
                .data((t = this.layers2, this.layers2 = this.layers0, this.layers0 = t))
                .transition()
                .duration(2500)
                .attr("d", this.area);
        }
    };
    StreamgraphComponent.prototype.ngAfterViewInit = function () {
    };
    Object.defineProperty(StreamgraphComponent.prototype, "options", {
        get: function () {
            return this._options = {
                height: window.innerHeight * (3 / 5),
                width: document.getElementById("laptimes").parentElement.clientWidth
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], StreamgraphComponent.prototype, "onResize", null);
    StreamgraphComponent = __decorate([
        Component({
            selector: 'app-streamgraph',
            //changeDetection: ChangeDetectionStrategy.OnPush,
            templateUrl: "./streamgraph.component.html",
            styleUrls: ['./streamgraph.component.css'],
            providers: [F1DataService]
        }),
        __metadata("design:paramtypes", [D3Service,
            ChangeDetectorRef,
            F1DataService,
            ActivatedRoute])
    ], StreamgraphComponent);
    return StreamgraphComponent;
}());
export { StreamgraphComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/visuals/streamgraph/streamgraph.component.js.map