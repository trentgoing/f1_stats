import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeListComponent } from './home-list/home-list.component';
import { OrdinalPipe } from './ordinal.pipe';
import { FrameworkComponent } from './framework/framework.component';
import { RacePageComponent } from './race-page/race-page.component';
import { RaceInfoComponent } from './race-info/race-info.component';
import { DriverResultsComponent } from './driver-results/driver-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeListComponent,
    OrdinalPipe,
    FrameworkComponent,
    RacePageComponent,
    RaceInfoComponent,
    DriverResultsComponent
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
    }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
