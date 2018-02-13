import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LanguageGuard implements CanActivate {


    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (['en', 'ru', 'cn', 'jp', 'fr', 'es', 'de', 'kr'].includes(next.params.language)) {
            return true;
        }

        this.router.navigate(['/en/page-not-found']);
    }
}
