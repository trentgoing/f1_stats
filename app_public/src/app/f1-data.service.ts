import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Result } from './result';
import { Race, LapTime } from './race';
import { Season } from './season';

@Injectable()
export class F1DataService {

  constructor(private http: Http) { }
  
  private apiBaseUrl = 'http://localhost:3000/api/';

  public getResults(race_id: string): Promise<Result[]> {
    const url: string = `${this.apiBaseUrl}/raceresults/${race_id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Result[])
      .catch(this.handleError);
  }

  public getRaces(): Promise<Race[]> {
    const url: string = `${this.apiBaseUrl}/races`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Race[])
      .catch(this.handleError);
  }

  public getRace(race_id: string): Promise<Race> {
    const url: string = `${this.apiBaseUrl}/races/${race_id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Race)
      .catch(this.handleError);
  }

  public getSeason(year: string): Promise<Season> {
    const url: string = `${this.apiBaseUrl}/seasons/${year}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Season)
      .catch(this.handleError);
  }

  public getSeasonRaces(year: string): Promise<Race[]> {
    const url: string = `${this.apiBaseUrl}/seasonraces/${year}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Race[])
      .catch(this.handleError);
  }

  public getRaceLapTimes(race_id: string): Promise<LapTime[]> {
    const url: string = `${this.apiBaseUrl}/laptimes/${race_id}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as LapTime[])
      .catch(this.handleError);
  } 

  private handleError(error: any): Promise<any> {
    console.error('Something went wrong.', error);
    return Promise.reject(error.message || error);
  }
} 
