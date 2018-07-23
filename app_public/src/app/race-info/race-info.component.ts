import { Component, OnInit } from '@angular/core';
import { F1DataService } from '../f1-data.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router'; 
import 'rxjs/add/operator/switchMap';

import { Result } from '../result';
import { Race } from '../race';

import RACE_CONFIG from './race-info.config'
import { Node, Link } from '../d3';

@Component({
  selector: 'app-race-info',
  templateUrl: './race-info.component.html',
  styleUrls: ['./race-info.component.css'],
  providers: [F1DataService]
})
export class RaceInfoComponent implements OnInit {



  constructor(
    private f1DataService: F1DataService,
    private route: ActivatedRoute
  ) { }

  race: Race;
  results: Result[];
  newResults: Result[];
  seasonRaces: Race[];
  selectedDrivers: string[] = [];

  nodes: Node[] = [];
  links: Link[] = [];

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id = params.get('raceId');
        return this.f1DataService.getRace(id);
      })
      .subscribe((newRace: Race) => {
        this.newResults = newRace.results;
        this.race = newRace;
        this.selectedDrivers = [];
        this.pageContent.header.name = newRace.name;
        this.pageContent.header.year = String(newRace.year);
        this.pageContent.info.location = newRace.circuit.name;
        try {
          this.pageContent.info.lap_count = String(newRace.results[0].laps);
        } catch (e){
          if(e instanceof TypeError){
            console.log('No laps run');
          }
        }
        this.f1DataService
          .getSeasonRaces(String(newRace.year))
            .then(foundRaces => {
              this.seasonRaces = foundRaces;
            });
      });

    const N = RACE_CONFIG.N; //,
    const getIndex = number => number - 1;
     
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }

  }

  driversSelected(event) {
    this.selectedDrivers = event;
    this.selectedDrivers = this.selectedDrivers.slice();
  }

  pageContent = {
    header : {
      name: '',
      year: ''
    },
    info : {
      location: '',
      lap_count: ''
    },
  }

}
