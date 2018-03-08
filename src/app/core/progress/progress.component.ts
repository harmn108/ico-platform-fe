import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {ApiService} from '../../services/api.service';
import {Subscription} from 'rxjs/Subscription';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit, OnDestroy {

  public softCap: number;
  public hardCap: number;
  public currentProgress = 0;
  public currentProgressPercentage = 0;
  public softProgressBar = {width: 0, css_class: ['soft-cup-loader']};
  public hardProgressBar = {width: 0, css_class: ['soft-cup-loader']};
  public softCapClass = ['col-9', 'soft-cap'];
  public spanStyle = {left: '', right: ''};
  private readonly minProgressLen = 2;
  public icoInfoSubscription: Subscription;
  public totalTransfersSub: Subscription;

  constructor(private apiService: ApiService,
              private configService: ConfigService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.configService.getIcoInfo();
      this.icoInfoSubscription = this.configService.icoInfo.subscribe(configs => {
          this.softCap = configs.soft_cap;
          this.hardCap = configs.hard_cap;
          this.getCurrentProgress();
        },
        err => console.error(err));
    }
  }

  getCurrentProgress() {
    this.totalTransfersSub = this.apiService.getTotalTransfers()
      .subscribe(data => {
          if (data && data['totalSoldToken']) {
            this.currentProgress = data['totalSoldToken'];
            this.currentProgressPercentage = Math.round(
              this.currentProgress * 100 / (this.hardCap + this.softCap)
            );

            if (this.currentProgress <= this.softCap) {
              // make the softcapbar round
              this.softCapClass.push('norm');

              // =====calculate the progress bar length=====
              const softProgressBarWidth = Number(
                (
                  (this.currentProgress / this.softCap * 100)
                ).toFixed(3)
              );

              // set the length to the minimum if current progress is less
              this.softProgressBar.width = (softProgressBarWidth > this.minProgressLen)
                ? softProgressBarWidth
                : this.minProgressLen;

              // make the progress bar round when near the softcap
              if (this.softProgressBar.width > 98) {
                this.softProgressBar.css_class.push('end');

              }

            } else {
              // make the softcap bar straight
              this.softCapClass.push('sep');

              // calculate the progress bar length
              const hardExcess = this.currentProgress - this.softCap;
              this.softProgressBar.width = 100;
              this.hardProgressBar.width = Number(
                (
                  (hardExcess / this.hardCap * 100)
                ).toFixed(3)
              );
              // make the progress bar round when near the hardcap
              if (this.currentProgressPercentage > 98) {
                this.hardProgressBar.css_class.push('end');
              }
            }
            // console.log(this.softCap, this.hardCap, this.currentProgress);
          }
        },
        err => console.error(err));

  }

  ngOnDestroy() {
    this.icoInfoSubscription && this.icoInfoSubscription.unsubscribe();
    this.totalTransfersSub && this.totalTransfersSub.unsubscribe();
  }
}
