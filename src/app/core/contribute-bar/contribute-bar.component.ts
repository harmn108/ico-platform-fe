import {Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {LanguageService} from '../../services/lenguage.service';

@Component({
    selector: 'app-contribute-bar',
    templateUrl: './contribute-bar.component.html',
    styleUrls: ['./contribute-bar.component.scss'],
    animations: [
        trigger(
            'barStatus', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('200ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({opacity: 1}),
                    animate('200ms', style({opacity: 0}))
                ])
            ]),
    ]
})

export class ContributeBarComponent implements OnInit, OnDestroy {

    public dhms = {};
    public shown = false;
    public expirationHours = 0;
    public expirationDays = 0;
    public currentBonus = 0;
    public _currentBonus: Subscription;
    public _expirationHours: Subscription;
    public _expirationDays: Subscription;

    constructor(private configService: ConfigService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: Object,
                private languageService: LanguageService) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        if (isPlatformBrowser(this.platformId)) {
            const button = document.querySelector('button');

            if (!button) {
                return;
            }

            this.shown = button.getBoundingClientRect().top < 0;
        }
    }

    ngOnInit() {
        this._currentBonus = this.configService._currentBonus.subscribe(currentBonus => this.currentBonus = currentBonus);
        this._expirationHours = this.configService.expirationHours.subscribe(expirationHours => this.expirationHours = expirationHours);
        this._expirationDays = this.configService.expirationDays.subscribe(expirationDays => this.expirationDays = expirationDays);
    }

    goContributePage() {
        this.router.navigate([`/${this.languageService.language.value}/contribute`]);
    }

    ngOnDestroy() {
        this._currentBonus.unsubscribe();
        this._expirationHours.unsubscribe();
        this._expirationDays.unsubscribe();
    }
}
