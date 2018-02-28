import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {LanguageService} from '../../services/lenguage.service';
import {ConfigService} from '../../services/config.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {


  @Input() timeline;
  public now;
  icoInfoSubscription: Subscription;

  config: any = {
    direction: 'horizontal',
    slidesPerView: 4,
    autoplayStopOnLast: false,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    breakpoints: {
      // when window width is <= 480px
      480: {
        slidesPerView: 1,
      },
      // when window width is <= 640px
      640: {
        slidesPerView: 2,
      },
      // when window width is <= 640px
      1024: {
        slidesPerView: 2,
      }
    }
  };

  public languageSub: Subscription;

  constructor(private apiService: ApiService,
              public configService: ConfigService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    if (!this.timeline) {
      this.languageSub = this.languageService.language.subscribe(lang => {
        this.apiService.getTimelines(lang).subscribe(
          data => {
            this.timeline = data;
          },
          err => console.error(err)
        );
      });
    }

    this.configService.getIcoDate();
    this.icoInfoSubscription = this.configService.icoInfo.filter(data => data).subscribe(config => {
      if (config.current_timestamp) {
        this.now = config.current_timestamp;
      }
    });
  }

  ngOnDestroy() {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
    this.icoInfoSubscription.unsubscribe();
  }
}
