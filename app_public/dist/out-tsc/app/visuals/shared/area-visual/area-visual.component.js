var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
var AreaVisualComponent = /** @class */ (function () {
    function AreaVisualComponent() {
        console.log('area constructed');
    }
    AreaVisualComponent.prototype.ngOnInit = function () {
        console.log('area OnInit');
        console.log(this.area);
    };
    __decorate([
        Input('areaVisual'),
        __metadata("design:type", Function)
    ], AreaVisualComponent.prototype, "area", void 0);
    AreaVisualComponent = __decorate([
        Component({
            selector: 'g[areaVisual]',
            templateUrl: './area-visual.component.html',
            styleUrls: ['./area-visual.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], AreaVisualComponent);
    return AreaVisualComponent;
}());
export { AreaVisualComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/visuals/shared/area-visual/area-visual.component.js.map