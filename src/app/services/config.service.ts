import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class ConfigService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private readonly baseUrl = environment.ico_url + '/api/v1/general';
  private configurations: Promise<any>;

  public icoDate = null;
  public icoInfo = new BehaviorSubject(null);
  public icoStage = null;
  readonly STAGE_EXPIRED = 0;
  readonly STAGE_PREICO = 1;
  readonly STAGE_ICO = 2;
  public dhms = new BehaviorSubject({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  public _currentBonus = new BehaviorSubject(null);
  public expirationHours = new BehaviorSubject(null);
  public expirationDays = new BehaviorSubject(null);
  public $icoInfo: Observable<any>;
  public diff = new BehaviorSubject(null);
  public days;
  public hours;
  public minutes;
  public seconds;
  public countdownOn = false;

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  createCountDown(data) {
    Observable.interval(1000).map((x) => {
      if (!this.countdownOn) {
        (this.countdownOn = true);
      }
      if (this.icoStage === this.STAGE_ICO) {
        this.diff.next(Math.floor(((data['ico_end_countdown'] -= 1 ))));
      }
      if (this.icoStage === this.STAGE_PREICO) {
        this.diff.next(Math.floor(((data['ico_countdown'] -= 1))));
      }

      return this.diff.value;
    }).subscribe(time => {
      if (time >= 0) {
        if (time === 0) {
          if (this.icoStage === this.STAGE_PREICO) {
            this.icoStage = this.STAGE_ICO;
            if (data['ico_end_date_timestamp'] - data['current_timestamp'] > 0) {
              this.icoDate = new Date(data['ico_end_date']);
            }
          } else {
            this.icoStage = this.STAGE_EXPIRED;
          }
        }
        this.dhmsCounter(time);
      }
    });
  }

  dhmsCounter(t) {
    this.days = Math.floor(t / 86400);
    t -= this.days * 86400;
    this.hours = Math.floor(t / 3600) % 24;
    t -= this.hours * 3600;
    this.minutes = Math.floor(t / 60) % 60;
    t -= this.minutes * 60;
    this.seconds = t % 60;
  }

  getIcoDate(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.icoDate && !this.$icoInfo) {
        return this.$icoInfo = this.http.get(this.baseUrl + '/get-configs', {headers: this.headers})
          .map(data => {
            this.icoInfo.next(data);
            this.createCountDown(data);
            const preIcoStart = data['ico_start_date_timestamp'];
            const icoStart = data['ico_end_date_timestamp'];
            const dateNow = data['current_timestamp'];
            if (((preIcoStart - dateNow) > 0)) {
              if (!this.icoDate) {
                this.icoDate = preIcoStart;
              }
              this.icoStage = this.STAGE_PREICO;
            } else if ((icoStart - dateNow) > 0) {
              if (!this.icoDate) {
                this.icoDate = icoStart;
              }
              this.icoStage = this.STAGE_ICO;
            } else {
              this.icoStage = this.STAGE_EXPIRED;
            }

            return data;
          })
          .catch(err => this.handleErrorObs(err));
      }

      return this.icoInfo;
    }
  }

  private init() {
    if (!this.configurations) {
      this.configurations = this.http.get(this.baseUrl + '/get-configs', {headers: this.headers})
        .toPromise()
        .then(response => {
          this.icoInfo.next(response);
          return this.icoInfo.value;
        })
        .catch(ConfigService.handleError);
    }
  }

  public has(key: string): Promise<boolean> {
    this.init();

    return this.configurations
      .then((config) => config.hasOwnProperty(key))
      .catch(() => ConfigService.handleError);
  }

  public getIcoDuration(): Promise<any> {
    return this.configurations
      .then(configInfo => {
        return (new Date(configInfo.ico_end_date).getTime() - new Date(configInfo.ico_start_date).getTime());
      })
      .catch(() => ConfigService.handleError);
  }

  public getDHMS() {
    return this.dhms;
  }

  public setDHMS(vals) {
    this.dhms.next(vals);
  }

  public get(key = ''): Promise<any> {
    this.init();

    return this.configurations
      .then((data) => {
        if (key) {
          if (data[key]) {
            return data[key];
          } else {
            ConfigService.handleError('key not found');
          }
        } else {
          return data;
        }
      })
      .catch(() => ConfigService.handleError);
  }

  currentBonus(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        this.icoInfo.subscribe(
          icoInfo => {
            if (icoInfo) {
              let currentBonus = {};
              const now = icoInfo["current_timestamp"];
              icoInfo.bonuses.forEach((bonus) => {
                if (((bonus.dateFrom) < now) && (now < (bonus.dateTo))) {
                  currentBonus = bonus;
                }
              });
              observer.next(currentBonus);
            }
          }
        );
      });
    }

  }

  private handleErrorObs(error: any): Observable<any> {
    if (error.status === 404) {
      error._body = '{"message" : "user_not_found"}';
      return Observable.throw(error);
    }
    return Observable.throw(error.error.message || error.error || error);
  }

}
