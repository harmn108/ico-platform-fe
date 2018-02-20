import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentService {

    constructor(private http: HttpClient, private userService: UserService) {
    }

    getPaxFulBtcRate(): Observable<any> {
        return this.http.get(`${environment.ico_url}/api/v1/paxful/get-btc-rate`)
        .map(res => {
            if (!res.hasOwnProperty('price') || !res.hasOwnProperty('currency')) {
                Observable.throw(new Error('Invalid response'));
            }
            return res;
        });
    }

    submitIndaCoinData(amount: number): Observable<string> {
        return this.doRequest({amount: amount})
        .map(res => {
            if (!res.hasOwnProperty('second_url')) {
                Observable.throw(new Error('Invalid response'));
            }
            return res['second_url'];
        });
    }

    submitPaxFulData(amount: number): Observable<string> {
        return this.doRequest({amount: amount})
        .map(res => {
            if (!res.hasOwnProperty('url')) {
                Observable.throw(new Error('Invalid response'));
            }
            return res['url'];
        });
    }

    doRequest(body: object) {
        const headers = new HttpHeaders().set('X-AUTH-TOKEN', this.userService.authToken);
        return this.http.post(
            `${environment.ico_url}/api/v1/paxful/get-payment-link`,
            body, {headers: headers}
        );
    }

}