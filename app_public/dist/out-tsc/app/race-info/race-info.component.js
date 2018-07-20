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
import RACE_CONFIG from './race-info.config';
import { Node, Link } from '../d3';
var RaceInfoComponent = /** @class */ (function () {
    function RaceInfoComponent(f1DataService, route) {
        this.f1DataService = f1DataService;
        this.route = route;
        this.nodes = [];
        this.links = [];
        this.pageContent = {
            header: {
                name: '',
                year: ''
            },
            info: {
                location: '',
                lap_count: ''
            },
        };
    }
    RaceInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            var id = params.get('raceId');
            return _this.f1DataService.getRace(id);
        })
            .subscribe(function (newRace) {
            _this.newResults = newRace.results;
            _this.race = newRace;
            _this.pageContent.header.name = newRace.name;
            _this.pageContent.header.year = String(newRace.year);
            _this.pageContent.info.location = newRace.circuit.name;
            try {
                _this.pageContent.info.lap_count = String(newRace.results[0].laps);
            }
            catch (e) {
                if (e instanceof TypeError) {
                    console.log('No laps run');
                }
            }
            _this.f1DataService
                .getSeasonRaces(String(newRace.year))
                .then(function (foundRaces) {
                _this.seasonRaces = foundRaces;
            });
        });
        var N = RACE_CONFIG.N; //,
        var getIndex = function (number) { return number - 1; };
        for (var i = 1; i <= N; i++) {
            this.nodes.push(new Node(i));
        }
        for (var i = 1; i <= N; i++) {
            for (var m = 2; i * m <= N; m++) {
                /** increasing connections toll on connecting nodes */
                this.nodes[getIndex(i)].linkCount++;
                this.nodes[getIndex(i * m)].linkCount++;
                /** connecting the nodes before starting the simulation */
                this.links.push(new Link(i, i * m));
            }
        }
    };
    RaceInfoComponent = __decorate([
        Component({
            selector: 'app-race-info',
            templateUrl: './race-info.component.html',
            styleUrls: ['./race-info.component.css'],
            providers: [F1DataService]
        }),
        __metadata("design:paramtypes", [F1DataService,
            ActivatedRoute])
    ], RaceInfoComponent);
    return RaceInfoComponent;
}());
export { RaceInfoComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/race-info/race-info.component.js.map