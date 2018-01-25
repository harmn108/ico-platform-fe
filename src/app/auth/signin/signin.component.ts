import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

    authenticationSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.authenticationSubscription = this.authService.singInSubject
            .subscribe((login: boolean) => {
                if (login) {
                    this.router.navigate(['/']);
                }
            });
    }

    ngOnDestroy() {
        this.authenticationSubscription.unsubscribe();
    }

    onSignin(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;

        this.authService.signInUser(email, password);
    }

}
