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
var DriverResultsComponent = /** @class */ (function () {
    function DriverResultsComponent() {
    }
    DriverResultsComponent.prototype.getStyleOrdinal = function (position) {
        if (position === 1) {
            return "badge badge-pill float-right badge-first";
        }
        else if (position === 2) {
            return "badge badge-pill float-right badge-second";
        }
        else if (position === 3) {
            return "badge badge-pill float-right badge-third";
        }
        else {
            return "badge badge-pill float-right";
        }
    };
    DriverResultsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DriverResultsComponent.prototype, "results", void 0);
    DriverResultsComponent = __decorate([
        Component({
            selector: 'app-driver-results',
            templateUrl: './driver-results.component.html',
            styleUrls: ['./driver-results.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], DriverResultsComponent);
    return DriverResultsComponent;
}());
export { DriverResultsComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/driver-results/driver-results.component.js.map