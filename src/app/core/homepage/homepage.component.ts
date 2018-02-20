import {Component, Injectable, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../../../environments/environment';
import {ApiService} from '../../services/api.service';
import {ContentService} from '../../services/content.service';
import {UserService} from '../../services/user.service';
import {ConfigService} from '../../services/config.service';
import {Broadcaster} from '../../shared/broadcaster/broadcaster';
import {LanguageService} from '../../services/lenguage.service';

function getWindow(): any {
  return window;
}

@Injectable()
export class WindowRefService {
  get nativeWindow(): any {
    return getWindow();
  }
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],

})

export class HomepageComponent implements OnInit {

  visaFooter = true;
  homeFooterVisibility: Boolean = true;
  pageContent = false;
  rates$: Observable<any>;
  isBrowser = false;
  ecosystemData;
  facts;
  public timelineData;
  public tokenAllocationData;
  public fundAllocationData;
  public foundationContent;
  protected readonly filesUrl = environment.ico_url + '/uploads/files';
  public homeClassValue = '';

  constructor(private router: Router,
              private api: ApiService,
              private contentService: ContentService,
              public userService: UserService,
              public configService: ConfigService,
              private broadcaster: Broadcaster,
              public windowRef: WindowRefService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private languageService: LanguageService) {

    this.router.events.subscribe(event => {
      (event['url'] && ((event['url'].slice(4, 11) === 'profile') || (event['url'].slice(4, 10) === 'wallet')))
        ? this.visaFooter = false : this.visaFooter = true;
      event['url'] === `/${this.languageService.language.value}` || event['url'] === '/'
        ? this.pageContent = true : this.pageContent = false;
    });


  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    //
    this.contentService.addHomeClassEvent$.subscribe(acc => {
      this.homeClassValue = acc;
    });

    // this.up();

    this.rates$ = this.api.getRates();
    this.contentService.getHomepageContent(this.languageService.language.value).subscribe(
      data => {
        if (data) {
          this.facts = data.facts;
          this.ecosystemData = data.ecosystem;
          this.timelineData = data.timeline;
          this.tokenAllocationData = data.token_allocation;
          this.fundAllocationData = data.fund_allocation;
          this.foundationContent = data.foundationData;
        }
      },
      err => console.error(err)
    );

    this.broadcaster.on<any>('showHeader')
      .subscribe(data => {
        this.homeFooterVisibility = data;
      });

    this.broadcaster.on<any>('showFooter')
      .subscribe(data => {
        this.homeFooterVisibility = data;
      });
  }

  up() {
    if (this.isBrowser) {
      const app = {
        chars: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
          'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ճ', 'դ', 'գ', 'վ', 'ո',
          'ֆ', 'ծ', 'զ', 'ր', '会', '联', '伴', '作', '团', '用', '式', '新', '者', '我', '员', '的', '各'],
        init: () => {
          app['container'] = document.createElement('div');
          app['container'].className = 'animation-container';
          document.getElementById('home').appendChild(app['container']);
          this.windowRef.nativeWindow.setInterval(app.add, 100);
        },
        add: () => {
          const element = document.createElement('span');
          app['container'].appendChild(element);
          app.animate(element);
        },
        animate: (element) => {
          const character = app.chars[Math.floor(Math.random() * app.chars.length)];
          const duration = Math.floor(Math.random() * 15) + 1;
          const offset = Math.floor(Math.random() * (100 - duration * 2)) + 3;
          const size = 10 + (15 - duration);
          element.style.cssText = 'right:' + offset + 'vw; font-size:' + size + 'px;animation-duration:' + duration + 's';
          element.innerHTML = character;
          this.windowRef.nativeWindow.setTimeout(app.remove, duration * 1000, element);

        },
        remove: (element) => {
          element.parentNode.removeChild(element);
        }
      };

      this.windowRef.nativeWindow.addEventListener('DOMContentLoaded', app.init());
    }
  }

  haveLang() {
    const langs = ['en', 'jp', 'cn', 'de'];
    return langs.includes(this.languageService.language.value);
  }
}
