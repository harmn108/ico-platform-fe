import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

export interface IToken {
    token: string;
}

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const baseURL = 'http://127.0.0.1:8000/api/v1';

@Injectable()
export class AuthService {
    token: string;
    singInSubject = new Subject<boolean>();
    singUpSubject = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) {
    }

    signUpUser(email: string, password: string) {
        this.http.post<IToken>(baseURL + '/signup', {
            email: email,
            password: password
        }, httpOptions).subscribe(
            (user: IToken) => {
                this.singUpSubject.next(true);
            },
            catchError(this.handleError<IToken>('signUpUser'))
        );
    }

    signInUser(email: string, password: string) {
        this.http.post<IToken>(baseURL + '/signin', {
            email: email,
            password: password
        }, httpOptions).subscribe(
            (user: IToken) => {
                this.token = user.token;
                this.singInSubject.next(true);
            },
            catchError(this.handleError<IToken>('signInUser'))
        );
    }

    logout() {
        this.token = null;
        this.singInSubject.next(false);
    }

    isAuthenticated() {
        return this.token != null;
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
        // this.messageService.add('HeroService: ' + message);
    }
}
