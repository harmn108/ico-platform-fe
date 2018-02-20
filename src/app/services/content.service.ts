import {EventEmitter, Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RouteSubject} from "./route-subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class ContentService {

  private readonly baseUrl = environment.ico_url + "/api/v1/general";
  public addHomeClassEvent$: EventEmitter<any> = new EventEmitter(true);

  lang = "";
  // translations
  private wallet: RouteSubject;
  private homepage: RouteSubject;
  private tokenAllocation: RouteSubject;
  private fundAllocation: RouteSubject;
  private ecosystem: RouteSubject;

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) {

    const headers = new HttpHeaders({"Content-Type": "application/json", "x-local-cache": "true"});

    this.wallet = new RouteSubject(this.http, headers);
    this.homepage = new RouteSubject(this.http, headers);
    this.tokenAllocation = new RouteSubject(this.http, headers);
    this.fundAllocation = new RouteSubject(this.http, headers);
    this.ecosystem = new RouteSubject(this.http, headers);
  }

  getHomepageContent(lang: string): BehaviorSubject<any> {
    if (isPlatformBrowser(this.platformId)) {

      return this.homepage.next(this.baseUrl + "/get-homepage-content/" + lang);
    }
  }

  getWalletContent(lang: string): BehaviorSubject<any> {
    if (isPlatformBrowser(this.platformId)) {

      return this.wallet.next(this.baseUrl + "/get-wallet-content/" + lang);
    }
  }

  getEcosystem(lang: string): BehaviorSubject<any> {
    if (isPlatformBrowser(this.platformId)) {

      return this.wallet.next(this.baseUrl + "/get-publiq-ecosystem/" + lang);
    }
  }

  getTokenAllocation(lang: string): BehaviorSubject<any> {
    if (isPlatformBrowser(this.platformId)) {

      return this.tokenAllocation.next(this.baseUrl + "/get-token-allocation/" + lang);
    }
  }

  getFundAllocation(lang: string): BehaviorSubject<any> {
    if (isPlatformBrowser(this.platformId)) {

      return this.fundAllocation.next(this.baseUrl + "/get-fund-allocation/" + lang);
    }
  }
}
