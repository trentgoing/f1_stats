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
var Driver = /** @class */ (function () {
    function Driver() {
    }
    return Driver;
}());
export { Driver };
var Result = /** @class */ (function () {
    function Result() {
    }
    return Result;
}());
export { Result };
var Team = /** @class */ (function () {
    function Team() {
    }
    return Team;
}());
export { Team };
var Race = /** @class */ (function () {
    function Race() {
    }
    return Race;
}());
export { Race };
var HomeListComponent = /** @class */ (function () {
    function HomeListComponent(f1DataService) {
        this.f1DataService = f1DataService;
    }
    HomeListComponent.prototype.getStyleOrdinal = function (position) {
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
    HomeListComponent.prototype.ngOnInit = function () {
    };
    HomeListComponent = __decorate([
        Component({
            selector: 'app-home-list',
            templateUrl: './home-list.component.html',
            styleUrls: ['./home-list.component.css'],
            providers: [F1DataService]
        }),
        __metadata("design:paramtypes", [F1DataService])
    ], HomeListComponent);
    return HomeListComponent;
}());
export { HomeListComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/home-list/home-list.component.js.map