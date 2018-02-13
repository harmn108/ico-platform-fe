import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {distinctUntilChanged} from 'rxjs/operators';

import {isDevMode} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class RouteSubject {

    private headers: HttpHeaders;
    private subscribed = false;

    data = new BehaviorSubject(null);
    url = new BehaviorSubject<string>('');

    /**
     *
     * @param http
     * @param headers
     */
    constructor(private http: HttpClient, headers: HttpHeaders) {
        this.headers = headers;
    }

    /**
     *
     * @param url
     * @returns {BehaviorSubject}
     */
    next(url: string): BehaviorSubject<any> {
        // add subscriber for the first time
        if (this.subscribed === false) {
            this.subscribed = true;
            // wallet data
            this.url.pipe(
                // ignore new term if same as previous term
                distinctUntilChanged(),
            ).subscribe(url => {
                this.http.get(url, {headers: this.headers})
                    .subscribe(result => {
                        if (isDevMode()) {
                            console.log(`response of ${this.url.getValue()}`);
                        }
                        this.data.next(result);
                    }, RouteSubject.handleError);
            });
        }

        // make http request
        this.url.next(url);

        // return BehaviorSubject which will receive data
        return this.data;
    }

    /**
     * Static funciton for error handling
     *
     * @param error
     * @returns {any}
     */
    private static handleError(error: any): Observable<any> {
        if (error.status === 404) {
            error._body = '{"message": "user_not_found"}';
            return Observable.throw(error);
        }
        return Observable.throw(error.message || error);
    }
}
