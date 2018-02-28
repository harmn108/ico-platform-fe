import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ConfigService} from '../../services/config.service';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  icoInfoSubscription: Subscription;

  constructor(public configService: ConfigService,
              public userService: UserService,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.configService.getIcoDate();

      this.icoInfoSubscription = this.configService.icoInfo.filter(data => data).subscribe( data => {
        if (this.configService.icoStage === this.configService.STAGE_EXPIRED) {
          return;
        }
      });
    }
  }

  ngOnDestroy() {
    this.icoInfoSubscription.unsubscribe();
  }

}
