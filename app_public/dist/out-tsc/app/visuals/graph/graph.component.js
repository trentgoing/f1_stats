var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, Input } from '@angular/core';
import { D3Service } from '../../d3/d3.service';
var GraphComponent = /** @class */ (function () {
    function GraphComponent(d3Service, ref) {
        this.d3Service = d3Service;
        this.ref = ref;
        this._options = { width: 200, height: 150 };
    }
    GraphComponent.prototype.onResize = function (event) {
        this.graph.initSimulation(this.options);
    };
    GraphComponent.prototype.ngOnInit = function () {
        var _this = this;
        /** Receiving an initialized simulated graph from our custom d3 service */
        this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
        this.graph.ticker.subscribe(function (d) {
            _this.ref.markForCheck();
        });
    };
    GraphComponent.prototype.ngAfterViewInit = function () {
        this.graph.initSimulation(this.options);
    };
    Object.defineProperty(GraphComponent.prototype, "options", {
        get: function () {
            return this._options = {
                height: window.innerHeight * (3 / 5),
                width: document.getElementById("positions").parentElement.clientWidth
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GraphComponent.prototype, "nodes", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], GraphComponent.prototype, "links", void 0);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GraphComponent.prototype, "onResize", null);
    GraphComponent = __decorate([
        Component({
            selector: 'app-graph',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <svg #svg [attr.width]=\"_options.width\" [attr.height]=\"_options.height\">\n      <g [attr.zoomableOf]=\"svg\">\n        <g [linkVisual]=\"link\" *ngFor=\"let link of links\"></g>\n        <g [nodeVisual]=\"node\" *ngFor=\"let node of nodes\" [draggableNode]=\"node\" [draggableInGraph]=\"graph\"></g>\n      </g>\n    </svg>\n  ",
            styleUrls: ['./graph.component.css']
        }),
        __metadata("design:paramtypes", [D3Service, ChangeDetectorRef])
    ], GraphComponent);
    return GraphComponent;
}());
export { GraphComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/visuals/graph/graph.component.js.map