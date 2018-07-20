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
import { Link } from '../../../d3/models/';
var LinkVisualComponent = /** @class */ (function () {
    function LinkVisualComponent() {
    }
    __decorate([
        Input('linkVisual'),
        __metadata("design:type", Link)
    ], LinkVisualComponent.prototype, "link", void 0);
    LinkVisualComponent = __decorate([
        Component({
            selector: 'g[linkVisual]',
            templateUrl: './link-visual.component.html',
            styleUrls: ['./link-visual.component.css']
        })
    ], LinkVisualComponent);
    return LinkVisualComponent;
}());
export { LinkVisualComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/visuals/shared/link-visual/link-visual.component.js.map