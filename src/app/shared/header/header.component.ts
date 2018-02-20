import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LanguageService} from '../../services/lenguage.service';
import {UserService} from '../../services/user.service';
import {ContentService} from '../../services/content.service';
import {ConfigService} from '../../services/config.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly languages = ['en', 'ru', 'cn', 'jp', 'kr', 'fr', 'es', 'de'];
  currentLanguage = this.languages[0];
  currentpath;
  dropdownMenu = false;
  active = '';
  isActive = '';
  public headerClass = ['hide'];

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

  constructor(private router: Router,
              public userService: UserService,
              public contentService: ContentService,
              public configService: ConfigService,
              @Inject(PLATFORM_ID) private platformId: Object,
              public languageService: LanguageService) {

    this.router.events.subscribe(event => {
      this.currentpath = event['urlAfterRedirects'];
      if (event instanceof NavigationEnd) {
        this.currentLanguage = this.currentpath.slice(1, 3);
        this.languageService.language.next(this.currentLanguage);
      }
    });
  }

  ngOnInit() {
  }

  changeLanguage(index) {

    this.currentLanguage = this.languages[index];
    this.languageService.language.next(this.currentLanguage);
    this.dropdownMenu = false;
    this.router.navigate([`${this.currentLanguage}/${this.currentpath.substring(3)}`]);
    this.changeClasses();
    this.contentService.getHomepageContent(this.languageService.language.value);
    this.contentService.getWalletContent(this.languageService.language.value);
  }

  redirect() {
    this.router.navigate([`${this.currentLanguage}`]);
  }

  toggleDropdownMenu() {
    this.active ? this.active = '' : this.active = 'active';
    this.dropdownMenu = !this.dropdownMenu;
  }

  outsideClick() {
    this.dropdownMenu = false;
    this.active = '';
  }

  changeClasses() {
    this.isActive === '' ? this.isActive = 'is-active' : this.isActive = '';
    this.headerClass.forEach((string, index, thisArray) => {
      if (string === 'hide') {
        thisArray[index] = 'show';
        return;
      }
      if (string === 'show') {
        thisArray[index] = 'hide';
        return;
      }
    });
  }

  checkWallet() {
    if (this.userService.authToken && !this.userService.hasSubmittedKyc) {
      this.router.navigate([`${this.currentLanguage}/profile/kyc`]);
    } else if (this.userService.authToken) {
      this.router.navigate([`${this.currentLanguage}/profile/wallet`]);
    } else {
      this.router.navigate([`${this.currentLanguage}/check-wallet`]);
    }
    this.changeClasses();
  }

  referral() {
    this.router.navigate([`${this.currentLanguage}/referral`]);
    this.changeClasses();
  }

  exit() {
    this.userService.exit();
    this.changeClasses();
  }
}
