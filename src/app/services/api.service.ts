import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RouteSubject} from './route-subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ApiService {

  // TimeLine
  private timeline: RouteSubject;
  private totalTransfers: RouteSubject;
  private rates: RouteSubject;

  constructor(private http: HttpClient) {
    // define headers
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'x-local-cache': 'true'});

    // init subjects
    this.timeline = new RouteSubject(this.http, headers);
    this.totalTransfers = new RouteSubject(this.http, headers);
    this.rates = new RouteSubject(this.http, headers);
  }

  getRates(): BehaviorSubject<any> {
    return this.rates.next(environment.ico_url + '/api/v1/pbq/rates');
  }

  getTimelines(lang): BehaviorSubject<any> {
    return this.timeline.next(environment.ico_url + `/api/v1/general/get-timeline/${lang}`);
  }

  getTotalTransfers(): BehaviorSubject<any> {
    return this.totalTransfers.next(`${environment.ico_url}/api/v1/general/get-total-transfers`);
  }
}
