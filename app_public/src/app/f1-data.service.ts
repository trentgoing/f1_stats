import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Result } from './driver-results/driver-results.component'
import { Race } from './race-page/race-page.component'
import 'rxjs/add/operator/toPromise';

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
      .then(response => response.json() as Race[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something went wrong.', error);
    return Promise.reject(error.message || error);
  }
} 
