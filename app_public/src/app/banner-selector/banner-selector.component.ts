import { Component, OnInit, Input } from '@angular/core';
import { F1DataService } from '../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router'; 
import 'rxjs/add/operator/switchMap';

import { Result } from '../result';
import { Race } from '../race';
import { Season } from '../season';

@Component({
  selector: 'app-banner-selector',
  templateUrl: './banner-selector.component.html',
  styleUrls: ['./banner-selector.component.css'],
  providers: [F1DataService]
})
export class BannerSelectorComponent implements OnInit {

  @Input() content: any;
  @Input() race: Race;
  @Input() season: Season;
  @Input() seasonRaces: Race[];

  constructor(
    private f1DataService: F1DataService
  ) { }

  public prixSelectorVisible: boolean = false;
  public prixTitleVisible: boolean = true;

  public togglePrixSelector() {
    if (this.prixSelectorVisible === true) {
      this.prixSelectorVisible = false;
      if(this.race == null) {
        this.content.name = "Season";
      } else {
        this.content.name = this.race.name;
      }
    } else if (this.prixSelectorVisible === false) {
      this.prixSelectorVisible = true;
      this.content.name = '<-';
    }
  }

  items: string[] = [
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
 
  onHidden(): void {
    //console.log('Dropdown is hidden');
  }
  onShown(): void {
    //console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    //console.log('Dropdown state is changed');
  }

  ngOnInit(): void {
    this.prixSelectorVisible = false;
    //let id = this.content.year;
    //this.f1DataService
    //  .getSeasonRaces(id)
    //    .then(foundRaces => {
    //      this.seasonRaces = foundRaces;
    //    });
  }

}
