var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ElementRef } from '@angular/core';
import { Node, ForceDirectedGraph } from '../models';
import { D3Service } from '../d3.service';
var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    DraggableDirective.prototype.ngOnInit = function () {
        this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
    };
    __decorate([
        Input('draggableNode'),
        __metadata("design:type", Node)
    ], DraggableDirective.prototype, "draggableNode", void 0);
    __decorate([
        Input('draggableInGraph'),
        __metadata("design:type", ForceDirectedGraph)
    ], DraggableDirective.prototype, "draggableInGraph", void 0);
    DraggableDirective = __decorate([
        Directive({
            selector: 'g[draggableNode]'
        }),
        __metadata("design:paramtypes", [D3Service, ElementRef])
    ], DraggableDirective);
    return DraggableDirective;
}());
export { DraggableDirective };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/d3/directives/draggable.directive.js.map