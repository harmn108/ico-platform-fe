import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ErrorMessage} from '../../shared/error-messages/error-messages';
import {WalletType} from '../../shared/local/wallet.enum';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  wallets = [];
  bitcoinTotalToken = 0;
  ethereumTotalToken = 0;
  transactions = [];
  step = 0;
  error = '';

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.wallets = this.userService.walletTypes;
    for (const wallet of this.wallets) {
      this.userService.setWallet(wallet)
        .filter(data => data)
        .subscribe(
          data => {
            // for wallets step loop tracking
            this.step += 1;
            data.transactions.forEach(transaction => {
              if (wallet === WalletType.Bitcoin) {
                transaction['key'] = wallet;
                this.bitcoinTotalToken += transaction['tokenAmount'];
              }
              if (wallet === WalletType.Ethereum) {
                transaction['key'] = wallet;
                this.ethereumTotalToken += transaction['tokenAmount'];
              }
            });


            if (this.transactions.length) {
              this.transactions = this.transactions.concat(data.transactions);
            } else {
              this.transactions = data.transactions;
            }

            this.transactions.sort(function (a, b) {
              return b.transactionDate - a.transactionDate;
            });
          },
          err => {
            console.error(err);
            // const errMessage = JSON.parse(err._body).message;
            this.error = ErrorMessage[err];
          });
    }

  }

}
