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
import { F1DataService } from '../f1-data.service';
import 'rxjs/add/operator/switchMap';
import { Race } from '../race';
import { Season } from '../season';
var BannerSelectorComponent = /** @class */ (function () {
    function BannerSelectorComponent(f1DataService) {
        this.f1DataService = f1DataService;
        this.prixSelectorVisible = false;
        this.prixTitleVisible = true;
        this.items = [
            '2017',
            '2016',
            '2015',
            '2014',
            '2013',
            '2012',
            '2011',
            '2010',
            '2009'
        ];
    }
    BannerSelectorComponent.prototype.togglePrixSelector = function () {
        if (this.prixSelectorVisible === true) {
            this.prixSelectorVisible = false;
            if (this.race == null) {
                this.content.name = "Season";
            }
            else {
                this.content.name = this.race.name;
            }
        }
        else if (this.prixSelectorVisible === false) {
            this.prixSelectorVisible = true;
            this.content.name = '<-';
        }
    };
    BannerSelectorComponent.prototype.onHidden = function () {
        //console.log('Dropdown is hidden');
    };
    BannerSelectorComponent.prototype.onShown = function () {
        //console.log('Dropdown is shown');
    };
    BannerSelectorComponent.prototype.isOpenChange = function () {
        //console.log('Dropdown state is changed');
    };
    BannerSelectorComponent.prototype.ngOnInit = function () {
        this.prixSelectorVisible = false;
        //let id = this.content.year;
        //this.f1DataService
        //  .getSeasonRaces(id)
        //    .then(foundRaces => {
        //      this.seasonRaces = foundRaces;
        //    });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], BannerSelectorComponent.prototype, "content", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Race)
    ], BannerSelectorComponent.prototype, "race", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Season)
    ], BannerSelectorComponent.prototype, "season", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], BannerSelectorComponent.prototype, "seasonRaces", void 0);
    BannerSelectorComponent = __decorate([
        Component({
            selector: 'app-banner-selector',
            templateUrl: './banner-selector.component.html',
            styleUrls: ['./banner-selector.component.css'],
            providers: [F1DataService]
        }),
        __metadata("design:paramtypes", [F1DataService])
    ], BannerSelectorComponent);
    return BannerSelectorComponent;
}());
export { BannerSelectorComponent };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/banner-selector/banner-selector.component.js.map