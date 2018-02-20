import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {Router} from "@angular/router";
import {LanguageService} from "./lenguage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthInfo} from "../shared/local/auth-info";
import {Wallet} from "../shared/local/wallet";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {BACKEND_URL} from "../../environments/parameters";

@Injectable()
export class UserService {

  private readonly headers = new HttpHeaders({"Content-Type": "application/json"});
  private readonly usersUrl = environment.ico_url + "/api/v1/user";
  authToken = null;
  hasSubmittedKyc = null;
  referralKey = "";
  agreement: number;
  currentCurrency;
  currentBalance = 0;
  totalBtc = 0;
  totalEth = 0;
  walletTypes = [];
  profileHashParams = "";
  eth = new BehaviorSubject(null);
  btc = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private router: Router,
              private languageService: LanguageService) {
  }

  emailSubmit(email: string, lang: string, agreement: number) {
    return this.http.put(this.usersUrl, {email, lang, agreement}, {headers: this.headers})
      .map(res => res)
      .catch(err => this.handleError(err));
  }

  referralEmailSubmit(email: string, lang: string) {
    return this.http.post(environment.ico_url + "/api/v1/user/send-referral-link", {
      email,
      lang
    }, {headers: this.headers})
      .catch(err => this.handleError(err));
  }

  getReferralInfo() {
    const tokenHeader = new HttpHeaders({"X-AUTH-TOKEN": this.authToken});

    return this.http.get(environment.ico_url + "/api/v1/user/get-referral-info", {headers: tokenHeader})
      .catch(err => this.handleError(err));
  }

  subscribeEmailSubmit(email: string, lang: string) {
    return this.http.post(environment.ico_url + "/api/v1/subscriber/add", {
      email,
      lang
    }, {headers: this.headers})
      .catch(err => this.handleError(err));
  }

  submitKyc(formData: FormData) {
    const tokenHeader = new HttpHeaders({"X-AUTH-TOKEN": this.authToken});
    return this.http.post(`${BACKEND_URL}/api/v1/user/kyc`, formData, {headers: tokenHeader});
  }

  getApiKey(code) {
    return this.http.get(this.usersUrl + `/api-key/${code}`, {headers: this.headers})
      .map((result: AuthInfo) => {
        this.totalBtc = result.total_btc;
        this.totalEth = result.total_eth;
        this.walletTypes = result.walletTypes;
        this.authToken = result.token;
        this.agreement = result.agreement;
        this.referralKey = result.referralKey;
        this.currentBalance = result.balance;

        return result;
      })
      .catch(err => this.handleError(err));
  }

  setWallet(wallet) {
    this.currentCurrency = wallet;
    const tokenHeader = new HttpHeaders({"X-AUTH-TOKEN": this.authToken});
    if (!this[wallet].value) {
      return this.http.get(this.usersUrl + `/get-wallet-data/${wallet}`, {headers: tokenHeader})
        .map((result: Wallet) => {

          result.imageURL = environment.ico_url + "/" + result.imageURL;
          result.wallet = wallet;

          this[wallet].next(result);

          return result;
        })
        .catch(err => this.handleError(err));
    }

    return this[wallet];

  }

  confirmAgreement() {
    const tokenHeader = new HttpHeaders({"X-AUTH-TOKEN": this.authToken});
    return this.http.post(this.usersUrl + "/agreement-confirmation", "", {headers: tokenHeader})
      .map(res => this.agreement = 1)
      .catch(err => this.handleError(err));
  }

  exit() {
    this.authToken = "";
    this.agreement = 0;
    this.totalBtc = 0;
    this.totalEth = 0;
    this.router.navigate([`/${this.languageService.language.value}`]);
  }

  goToWallet() {
    this.router.navigate([`/${this.languageService.language.value}/profile/wallet`]);
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 404) {
      error._body = "{\"message\": \"user_not_found\"}";
      return Observable.throw(error);
    }
    return Observable.throw(error.error.message || error.message || error);
  }

}
