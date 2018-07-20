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
var SeasonStandingsComponent = /** @class */ (function () {
    function SeasonStandingsComponent() {
        this.radioModel = 'Drivers';
    }
    SeasonStandingsComponent.prototype.getStyleOrdinal = function (position) {
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
    SeasonStandingsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SeasonStandingsComponent.prototype, "WCCStandings", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SeasonStandingsComponent.prototype, "WDCStandings", void 0);
    SeasonStandingsComponent = __decorate([
        Component({
            selector: 'app-season-standings',
            templateUrl: './season-standings.component.html',
            styleUrls: ['./season-standings.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], SeasonStandingsComponent);
    return SeasonStandingsComponent;
}());
export { SeasonStandingsComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/season-standings/season-standings.component.js.map