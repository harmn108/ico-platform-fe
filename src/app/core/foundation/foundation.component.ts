import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {ContentService} from '../../services/content.service';
import {LanguageService} from '../../services/lenguage.service';
import {Subscription} from 'rxjs/Subscription';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.scss']
})
export class FoundationComponent implements OnInit, OnDestroy {
  @Input() foundationData;
  public languageSub: Subscription;

  constructor(private contentService: ContentService,
              private router: Router,
              private languageService: LanguageService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.foundationData) {
        this.languageService.language.subscribe(lang => {
            this.contentService.getHomepageContent(lang)
              .subscribe(
                data => {
                  if (data) {
                    this.foundationData = data.foundationData;
                  }
                },
                err => console.error(err)
              );
          },
          err => console.error(err));
      }
    }
  }

  ngOnDestroy() {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
  }


}
