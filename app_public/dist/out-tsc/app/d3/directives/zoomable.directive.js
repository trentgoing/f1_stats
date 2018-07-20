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
import { D3Service } from '../d3.service';
var ZoomableDirective = /** @class */ (function () {
    function ZoomableDirective(d3Service, _element) {
        this.d3Service = d3Service;
        this._element = _element;
    }
    ZoomableDirective.prototype.ngOnInit = function () {
        this.d3Service.applyZoomableBehaviour(this.zoomableOf, this._element.nativeElement);
    };
    __decorate([
        Input('zoomableOf'),
        __metadata("design:type", ElementRef)
    ], ZoomableDirective.prototype, "zoomableOf", void 0);
    ZoomableDirective = __decorate([
        Directive({
            selector: '[zoomableOf]'
        }),
        __metadata("design:paramtypes", [D3Service, ElementRef])
    ], ZoomableDirective);
    return ZoomableDirective;
}());
export { ZoomableDirective };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/d3/directives/zoomable.directive.js.map