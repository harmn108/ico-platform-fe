import {Component, OnInit} from '@angular/core';
import {NotificationService, NotificationTypeList} from '../../services/notification.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentLang = 'en';
  private actionClass = '';

  constructor(private notification: NotificationService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentLang = params.language;
    });

    this.notification.message.subscribe(data => {
      if (data.type === NotificationTypeList.success) {
        this.actionClass = 'notification-success';
      } else if (data.type === NotificationTypeList.error) {
        this.actionClass = 'notification-error';
      } else if (data.type === NotificationTypeList.info) {
        this.actionClass = 'notification-info';
      } else if (data.type === NotificationTypeList.warning) {
        this.actionClass = 'notification-warning';
      }

      this.openSnackBar(data.message, '');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, <MatSnackBarConfig>{
      duration: 3000,
      extraClasses: [this.actionClass],
    });
  }

}
