import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {ErrorMessage} from '../../shared/error-messages/error-messages';
import {UserService} from '../../services/user.service';
import {Wallet} from '../../shared/local/wallet';
import {NotificationService} from '../../services/notification.service';
import {WalletType} from '../../shared/local/wallet.enum';

const copy = require('clipboard-copy');

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnChanges {

  @Input() walletName;
  wallets = [];
  wallet: Wallet;
  error = '';
  currentCurrency = '';

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.wallets = this.userService.walletTypes;
    this.currentCurrency = changes.walletName.currentValue;
    // for (const wallet of this.wallets) {
    this.userService.setWallet(this.currentCurrency)
      .subscribe(
        data => {
          // if ( changes.walletName.currentValue === wallet ) {
          this.wallet = data;
          // }
        },
        err => {
          console.error(err);
          const errMessage = JSON.parse(err._body).message;
          this.error = ErrorMessage[errMessage];
        });
    // }
  }

  ngOnInit() {
  }

  isCopied(walletTarget) {
    copy(walletTarget.innerHTML);
    this.notificationService.success('Copied!');
  }

}
