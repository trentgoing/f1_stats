var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { D3Service } from './d3';
import { AppComponent } from './app.component';
import { HomeListComponent } from './home-list/home-list.component';
import { OrdinalPipe } from './ordinal.pipe';
import { FrameworkComponent } from './framework/framework.component';
import { RacePageComponent } from './race-page/race-page.component';
import { RaceInfoComponent } from './race-info/race-info.component';
import { DriverResultsComponent } from './driver-results/driver-results.component';
import { BannerSelectorComponent } from './banner-selector/banner-selector.component';
import { SeasonInfoComponent } from './season-info/season-info.component';
import { SeasonStandingsComponent } from './season-standings/season-standings.component';
import { PositionChangesComponent } from './position-changes/position-changes.component';
import { GraphComponent } from './visuals/graph/graph.component';
import { NodeVisualComponent } from './visuals/shared/node-visual/node-visual.component';
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';
import { ZoomableDirective } from './d3/directives/zoomable.directive';
import { DraggableDirective } from './d3/directives/draggable.directive';
import { StreamgraphComponent } from './visuals/streamgraph/streamgraph.component';
import { AreaVisualComponent } from './visuals/shared/area-visual/area-visual.component';
import { TextSpreadComponent } from './visuals/text-spread/text-spread.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                HomeListComponent,
                OrdinalPipe,
                FrameworkComponent,
                RacePageComponent,
                RaceInfoComponent,
                DriverResultsComponent,
                BannerSelectorComponent,
                SeasonInfoComponent,
                SeasonStandingsComponent,
                PositionChangesComponent,
                GraphComponent,
                NodeVisualComponent,
                LinkVisualComponent,
                ZoomableDirective,
                DraggableDirective,
                StreamgraphComponent,
                AreaVisualComponent,
                TextSpreadComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                RouterModule.forRoot([
                    {
                        path: '',
                        component: HomeListComponent
                    },
                    {
                        path: 'races/:raceId',
                        component: RaceInfoComponent
                    },
                    {
                        path: 'race-index',
                        component: RacePageComponent
                    },
                    {
                        path: 'seasons/:year',
                        component: SeasonInfoComponent
                    }
                ]),
                BsDropdownModule.forRoot(),
                AlertModule.forRoot(),
                ButtonsModule.forRoot()
            ],
            providers: [D3Service],
            bootstrap: [FrameworkComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/app.module.js.map