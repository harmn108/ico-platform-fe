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
  bitcoinTotalPBQ = 0;
  ethereumTotalPBQ = 0;
  moneroTotalPBQ = 0;
  bitcoinCashTotalPBQ = 0;
  litecoinTotalPBQ = 0;
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
                this.bitcoinTotalPBQ += transaction['pbqAmount'];
              }
              if (wallet === WalletType.Ethereum) {
                transaction['key'] = wallet;
                this.ethereumTotalPBQ += transaction['pbqAmount'];
              }
              if (wallet === WalletType.BitcoinCash) {
                transaction['key'] = wallet;
                this.bitcoinCashTotalPBQ += transaction['pbqAmount'];
              }
              if (wallet === WalletType.Monero) {
                transaction['key'] = wallet;
                this.moneroTotalPBQ += transaction['pbqAmount'];
              }
              if (wallet === WalletType.Litecoin) {
                transaction['key'] = wallet;
                this.litecoinTotalPBQ += transaction['pbqAmount'];
              }
            });


            if (this.transactions.length) {
              this.transactions = this.transactions.concat(data.transactions);
            } else {
              this.transactions = data.transactions;
            }

            this.transactions.sort(function (a, b) {
              // if (b.ethereumTransactionDate) {
              //     return b.ethereumTransactionDate - (a.ethereumTransactionDate || a.explorerTransactionDate);
              // }
              // if (b.explorerTransactionDate) {
              //     return b.explorerTransactionDate - (a.explorerTransactionDate || a.ethereumTransactionDate);
              // }
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
