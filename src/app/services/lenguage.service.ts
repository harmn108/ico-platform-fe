import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NavigationEnd, Router} from '@angular/router';

@Injectable()
export class LanguageService {

    public language = new BehaviorSubject('');

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.language.next(event['urlAfterRedirects'].slice(1, 3));
            }
        });
    }

}
