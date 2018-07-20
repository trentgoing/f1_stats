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
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
var SeasonInfoComponent = /** @class */ (function () {
    function SeasonInfoComponent(f1DataService, route) {
        this.f1DataService = f1DataService;
        this.route = route;
        this.pageContent = {
            header: {
                name: '',
                year: ''
            },
            info: {
                rounds: '0',
                wcc: 'Constructor',
                wcc_pts: '',
                wdc: 'Driver',
                wdc_pts: ''
            },
        };
    }
    SeasonInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            var id = params.get('year');
            return _this.f1DataService.getSeason(id);
        })
            .subscribe(function (newSeason) {
            _this.season = newSeason;
            _this.race = newSeason.races[0];
            _this.WDCStandings = _this.race.driverStandings;
            _this.WCCStandings = _this.race.constructorStandings;
            _this.pageContent.header.name = 'Season';
            _this.pageContent.info.rounds = String(_this.race.round);
            _this.pageContent.header.year = String(_this.season.year);
            try {
                _this.pageContent.info.wcc = String(_this.WCCStandings[0].team.name);
                _this.pageContent.info.wcc_pts = String(_this.WCCStandings[0].points);
                _this.pageContent.info.wdc = String(_this.WDCStandings[0].driver.forename + ' ' + _this.WDCStandings[0].driver.surname);
                _this.pageContent.info.wdc_pts = String(_this.WDCStandings[0].points);
            }
            catch (e) {
                if (e instanceof TypeError) {
                    console.log('No races run');
                }
            }
            _this.f1DataService
                .getSeasonRaces(String(_this.season.year))
                .then(function (foundRaces) {
                _this.seasonRaces = foundRaces;
            });
        });
    };
    SeasonInfoComponent = __decorate([
        Component({
            selector: 'app-season-info',
            templateUrl: './season-info.component.html',
            styleUrls: ['./season-info.component.css'],
            providers: [F1DataService]
        }),
        __metadata("design:paramtypes", [F1DataService,
            ActivatedRoute])
    ], SeasonInfoComponent);
    return SeasonInfoComponent;
}());
export { SeasonInfoComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/season-info/season-info.component.js.map