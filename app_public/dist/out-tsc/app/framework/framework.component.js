var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
var FrameworkComponent = /** @class */ (function () {
    function FrameworkComponent() {
        this.formVisible = false;
    }
    FrameworkComponent.prototype.toggleMenu = function () {
        if (this.formVisible === true) {
            this.formVisible = false;
        }
        else if (this.formVisible === false) {
            this.formVisible = true;
        }
    };
    FrameworkComponent.prototype.ngOnInit = function () {
    };
    FrameworkComponent = __decorate([
        Component({
            selector: 'app-framework',
            templateUrl: './framework.component.html',
            styleUrls: ['./framework.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], FrameworkComponent);
    return FrameworkComponent;
}());
export { FrameworkComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/framework/framework.component.js.map