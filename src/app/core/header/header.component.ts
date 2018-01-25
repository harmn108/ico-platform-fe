import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    authSubscription: Subscription;

    constructor(public authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.authSubscription = this.authService.singInSubject
            .subscribe((login: boolean) => {
                if (login === false) {
                    this.router.navigate(['/signin']);
                }
            });
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}
