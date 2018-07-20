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
import * as d3 from 'd3';
import { D3Service } from '../../d3/d3.service';
var TextSpreadComponent = /** @class */ (function () {
    function TextSpreadComponent(d3Service, ref) {
        this.d3Service = d3Service;
        this.ref = ref;
        this._options = { width: 200, height: 150 };
    }
    TextSpreadComponent.prototype.onResize = function (event) {
        this.graph.initialize(this.options);
    };
    TextSpreadComponent.prototype.ngOnInit = function () {
        this.graph = this.d3Service.getStreamgraph(this.options);
    };
    TextSpreadComponent.prototype.ngAfterViewInit = function () {
        var words = "Goodbye, it’s you\nI am sure that before some of those days I'd want to meet".split(/\s+/g);
        var canvas = document.querySelector("canvas"), canvas2 = canvas.cloneNode(), context = canvas.getContext("2d"), context2 = canvas2.getContext("2d"), width = this.options.width, height = this.options.height;
        console.log(width, height);
        context.font = context2.font = "300px Helvetica Neue";
        context.textAlign = context2.textAlign = "center";
        context.lineJoin = context2.lineJoin = "round";
        (function next() {
            var i = 0.5, text = words.shift();
            context.clearRect(0, 0, width, height);
            context.fillText(text, width / 2, height / 2 + 100);
            var timer = d3.timer(function () {
                if (text === undefined) {
                    return;
                }
                if (++i > text.length * 20)
                    return timer.stop(), next();
                context2.save();
                context2.clearRect(0, 0, width, height);
                context2.lineWidth = i & 1 ? i * 5 + 3 : i * 5;
                context2.strokeStyle = i & 1 ? "white" : "black";
                context2.strokeText(text, width / 2, height / 2 + 100);
                context2.restore();
                context2.drawImage(canvas, 0, 0);
                context.drawImage(canvas2, 0, 0);
            });
        })();
    };
    Object.defineProperty(TextSpreadComponent.prototype, "options", {
        get: function () {
            return this._options = {
                height: window.innerHeight * (3 / 5),
                width: document.getElementById("texttest").parentElement.clientWidth
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
    ], TextSpreadComponent.prototype, "onResize", null);
    TextSpreadComponent = __decorate([
        Component({
            selector: 'app-text-spread',
            templateUrl: './text-spread.component.html',
            styleUrls: ['./text-spread.component.css']
        }),
        __metadata("design:paramtypes", [D3Service, ChangeDetectorRef])
    ], TextSpreadComponent);
    return TextSpreadComponent;
}());
export { TextSpreadComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/visuals/text-spread/text-spread.component.js.map