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
import { F1DataService } from '../f1-data.service';
var Race = /** @class */ (function () {
    function Race() {
    }
    return Race;
}());
export { Race };
var RacePageComponent = /** @class */ (function () {
    function RacePageComponent(f1DataService) {
        this.f1DataService = f1DataService;
    }
    RacePageComponent.prototype.getRaces = function () {
        var _this = this;
        this.f1DataService
            .getRaces()
            .then(function (foundRaces) {
            _this.races = foundRaces;
        });
    };
    RacePageComponent.prototype.ngOnInit = function () {
        this.getRaces();
    };
    RacePageComponent = __decorate([
        Component({
            selector: 'app-race-page',
            templateUrl: './race-page.component.html',
            styleUrls: ['./race-page.component.css'],
            providers: [F1DataService]
        }),
        __metadata("design:paramtypes", [F1DataService])
    ], RacePageComponent);
    return RacePageComponent;
}());
export { RacePageComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/race-page/race-page.component.js.map