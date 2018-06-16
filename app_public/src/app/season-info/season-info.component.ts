import { Component, OnInit } from '@angular/core';
import { F1DataService } from '../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router'; 
import 'rxjs/add/operator/switchMap';

import { Result } from '../result';
import { Race, DriverStanding, ConstructorStanding } from '../race';
import { Season } from '../season';

@Component({
  selector: 'app-season-info',
  templateUrl: './season-info.component.html',
  styleUrls: ['./season-info.component.css'],
  providers: [F1DataService]
})
export class SeasonInfoComponent implements OnInit {

  constructor(
    private f1DataService: F1DataService,
    private route: ActivatedRoute
  ) { }

  race: Race;
  WDCStandings: DriverStanding[];
  WCCStandings: ConstructorStanding[];
  seasonRaces: Race[];
  season: Season;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('year');
        return this.f1DataService.getSeason(id);
      })
      .subscribe((newSeason: Season) => {
        this.season = newSeason;
        this.race = newSeason.races[0];
        this.WDCStandings = this.race.driverStandings;
        this.WCCStandings = this.race.constructorStandings;
        this.pageContent.header.name = 'Season';
        this.pageContent.info.rounds = String(this.race.round);
        this.pageContent.header.year = String(this.season.year);
        try {
          this.pageContent.info.wcc = String(this.WCCStandings[0].team.name);
          this.pageContent.info.wcc_pts = String(this.WCCStandings[0].points);
          this.pageContent.info.wdc = String(this.WDCStandings[0].driver.forename + ' '+ this.WDCStandings[0].driver.surname);
          this.pageContent.info.wdc_pts = String(this.WDCStandings[0].points);
        } catch (e){
          if(e instanceof TypeError){
            console.log('No races run');
          }
        }
        this.f1DataService
          .getSeasonRaces(String(this.season.year))
            .then(foundRaces => {
              this.seasonRaces = foundRaces;
            });
      });
    
  }

  pageContent = {
    header : {
      name: '',
      year: ''
    },
    info : {
      rounds: '0',
      wcc: 'Constructor',
      wcc_pts: '',
      wdc: 'Driver',
      wdc_pts:''
    },
  }

}
