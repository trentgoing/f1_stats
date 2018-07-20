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
import { Node } from '../../../d3/models/';
var NodeVisualComponent = /** @class */ (function () {
    function NodeVisualComponent() {
    }
    NodeVisualComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input('nodeVisual'),
        __metadata("design:type", Node)
    ], NodeVisualComponent.prototype, "node", void 0);
    NodeVisualComponent = __decorate([
        Component({
            selector: 'g[nodeVisual]',
            templateUrl: './node-visual.component.html',
            styleUrls: ['./node-visual.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], NodeVisualComponent);
    return NodeVisualComponent;
}());
export { NodeVisualComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/visuals/shared/node-visual/node-visual.component.js.map