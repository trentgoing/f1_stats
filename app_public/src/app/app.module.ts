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

@NgModule({
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
export class AppModule { }
