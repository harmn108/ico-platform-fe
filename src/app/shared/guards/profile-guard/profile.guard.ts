import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../../services/user.service';
import {LanguageService} from '../../../services/lenguage.service';

@Injectable()
export class ProfileGuard implements CanActivate {

    public lang;

    constructor(private userService: UserService,
                private router: Router,
                private languageService: LanguageService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.lang = next['_routerState'].url.slice(1, 3);
        this.languageService.language.next(this.lang);

        if (this.userService.authToken) {
            return true;
        }

        this.router.navigate([`/${this.lang}`]);
    }
}
