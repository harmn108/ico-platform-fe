import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {LanguageService} from './services/lenguage.service';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

declare const ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  routerSubscription: Subscription;

  constructor(private translate: TranslateService,
              private router: Router,
              private meta: Meta,
              private title: Title,
              @Inject(PLATFORM_ID) private platformId: Object,
              private languageService: LanguageService) {

    this.router.events.subscribe(event => {
      if (typeof ga !== 'undefined' && ga.length && event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.routerSubscription = this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }
    this.languageService.language.subscribe(lang => {
      if (lang) {
        this.translate.use(lang);
        this.translate.get('metadata').subscribe(
          data => {
            this.meta.updateTag({
                content: data.title
              },
              'property=\'og:title\''
            );
            this.meta.updateTag({
                content: data.description
              },
              'property=\'og:description\''
            );

            // this.title.setTitle(data.title);
          }
        );

      }
    });
  }

  // ngOnDestroy() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     if (this.routerSubscription) {
  //       this.routerSubscription.unsubscribe();
  //     }
  //   }
  // }
}
