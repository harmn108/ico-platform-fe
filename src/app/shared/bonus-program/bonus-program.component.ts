import {Component, OnInit, PLATFORM_ID, Inject, OnDestroy} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {Bonus} from '../local/bonuse-program';
import {Router} from '@angular/router';
import {LanguageService} from '../../services/lenguage.service';
import {isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-bonus-program',
  templateUrl: './bonus-program.component.html',
  styleUrls: ['./bonus-program.component.scss']
})
export class BonusProgramComponent implements OnInit, OnDestroy {

  bonuses: Array<Bonus> = [];
  configInfo = null;
  startTime = 0;
  classReverse = '';
  preIcoBonus = null;
  public icoInfoSubscription: Subscription;

  constructor(public configService: ConfigService,
              private router: Router,
              private languageService: LanguageService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (!(this.router.url === `/${this.languageService.language.value}`)) {
        this.classReverse = 'inner';
      }
      this.configService.getIcoInfo();
      this.icoInfoSubscription = this.configService.icoInfo.filter(data => data)
        .subscribe(configInfo => {
            if (!this.preIcoBonus && !this.configInfo) {
              this.preIcoBonus = configInfo.pre_ico_bonus;
              this.configInfo = configInfo;
              this.getIcoDuration();
            }
          },
          err => console.error(err));
    }
  }

  getIcoDuration() {
    const arrLastIndex = this.configInfo['bonuses'].length - 1;
    const duration = this.configInfo['bonuses'][arrLastIndex].dateTo - this.configInfo['bonuses'][0].dateFrom;
    this.drawBonuses(duration);
  }

  drawBonuses(icoDuration) {
    const numBonuses = this.configInfo['bonuses'].length;
    const leftSideWidth = 50;
    const minWidth = 10;
    let delta = 0;
    const leftSideDuration = this.configInfo['bonuses'][numBonuses - 2].dateTo - this.configInfo['bonuses'][0].dateFrom;

    this.configInfo['bonuses'].forEach((bonus: Bonus, index) => {
      if (index === 0) {
        bonus.style = ['first'];
      }
      if (index === numBonuses - 1) {
        bonus.timePercent = 100 - leftSideWidth - delta;
        bonus.style = ['last'];
      } else {
        const calculatedPercent = ((bonus.dateTo - bonus.dateFrom) * leftSideWidth) / leftSideDuration;
        if (calculatedPercent < minWidth) {
          delta = delta + minWidth - calculatedPercent;
          bonus.timePercent = minWidth;
        } else {
          bonus.timePercent = calculatedPercent;
        }
      }
      this.bonuses.push(bonus);
    });
    this.currentBonus();
  }

  currentBonus() {
    if (isPlatformBrowser(this.platformId)) {
      this.configService.currentBonus()
        .subscribe(currentBonus => {
          this.bonuses.forEach((bonus: Bonus, index) => {
            bonus['dateText'] = this.calculateDay(bonus.dateFrom, bonus.dateTo);
            if (bonus.dateTo === currentBonus.dateTo) {
              this.bonuses[index].style ? this.bonuses[index].style.push('active') : this.bonuses[index].style = ['active'];
              return;
            }
          });
        },
          err => console.error(err));
    }
  }

  calculateDay(dateFrom, dateTo) {
    if (this.startTime === 0) {
      this.startTime = dateFrom;
    }

    if ((dateFrom - this.startTime) < 86400) {
      const daysDiff = Math.ceil((dateTo - this.startTime) / 86400);

      if (daysDiff === 1) {
        return ['first24', null];
      } else {
        return ['firstFromTo', daysDiff];
      }
    } else {
      const daysDiffFrom = Math.ceil((dateFrom - this.startTime + 1) / 86400);
      const daysDiffTo = Math.ceil((dateTo - this.startTime + 1) / 86400);

      // return 'from day ' + daysDiffFromText + ' to ' + daysDiffToText + ' days';
      return ['fromTo', [daysDiffFrom, daysDiffTo]];

    }

  }

  ngOnDestroy() {
    this.icoInfoSubscription.unsubscribe();
  }

}
