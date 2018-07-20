var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ForceDirectedGraph, Streamgraph } from './models/';
var D3Service = /** @class */ (function () {
    function D3Service() {
    }
    /** This service will provide methods to enable user interaction with elements while
    * maintaining the d3 simulations physics
    */
    D3Service.prototype.applyZoomableBehaviour = function (svgElement, containerElement) {
        var svg, container, zoomed, zoom;
        svg = d3.select(svgElement);
        container = d3.select(containerElement);
        zoomed = function () {
            var transform = d3.event.transform;
            container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        };
        zoom = d3.zoom().on("zoom", zoomed);
        svg.call(zoom);
    };
    D3Service.prototype.applyDraggableBehaviour = function (element, node, graph) {
        var d3element = d3.select(element);
        function started() {
            d3.event.sourceEvent.stopPropagation();
            if (!d3.event.active) {
                graph.simulation.alphaTarget(0.3).restart();
            }
            d3.event.on('drag', dragged).on('end', ended);
            function dragged() {
                node.fx = d3.event.x;
                node.fy = d3.event.y;
            }
            function ended() {
                if (!d3.event.active) {
                    graph.simulation.alphaTarget(0);
                }
                node.fx = null;
                node.fy = null;
            }
        }
        d3element.call(d3.drag().on('start', started));
    };
    D3Service.prototype.getForceDirectedGraph = function (nodes, links, options) {
        var sg = new ForceDirectedGraph(nodes, links, options);
        return sg;
    };
    D3Service.prototype.getStreamgraph = function (options) {
        console.log('Service init StreamGraph');
        var sg2 = new Streamgraph(options);
        return sg2;
    };
    D3Service = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], D3Service);
    return D3Service;
}());
export { D3Service };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/d3/d3.service.js.map