var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var F1DataService = /** @class */ (function () {
    function F1DataService(http) {
        this.http = http;
        this.apiBaseUrl = 'http://localhost:3000/api/';
    }
    F1DataService.prototype.getResults = function (race_id) {
        var url = this.apiBaseUrl + "/raceresults/" + race_id;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    F1DataService.prototype.getRaces = function () {
        var url = this.apiBaseUrl + "/races";
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    F1DataService.prototype.getRace = function (race_id) {
        var url = this.apiBaseUrl + "/races/" + race_id;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    F1DataService.prototype.getSeason = function (year) {
        var url = this.apiBaseUrl + "/seasons/" + year;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    F1DataService.prototype.getSeasonRaces = function (year) {
        var url = this.apiBaseUrl + "/seasonraces/" + year;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    F1DataService.prototype.getRaceLapTimes = function (race_id) {
        var url = this.apiBaseUrl + "/laptimes/" + race_id;
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    F1DataService.prototype.handleError = function (error) {
        console.error('Something went wrong.', error);
        return Promise.reject(error.message || error);
    };
    F1DataService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], F1DataService);
    return F1DataService;
}());
export { F1DataService };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/f1-data.service.js.map