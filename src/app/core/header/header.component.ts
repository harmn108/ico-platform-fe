import {Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';

import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    authSubscription: Subscription;
    public headerClass: string[] = ['hide'];
    public isActive = null;

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
      if (isPlatformBrowser(this.platformId)) {
        if (60 < (document.documentElement.scrollTop || document.body.scrollTop) &&
            (document.documentElement.scrollTop || document.body.scrollTop) < (window.innerHeight - 90)) {
          if (!this.headerClass.includes('slide-top')) {
            this.headerClass.push('slide-top');
          }
          const index = this.headerClass.indexOf('dark');
          if (index >= 0) {
            this.headerClass.splice(index, 1);
          }
        } else if ((document.documentElement.scrollTop || document.body.scrollTop) > (window.innerHeight - 90)) {
          if (!this.headerClass.includes('dark')) {
            this.headerClass.push('dark');
          }
        } else {
          this.headerClass = ['hide'];
          this.isActive = '';
        }
      }
    }

    constructor(public authService: AuthService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: Object) {
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
