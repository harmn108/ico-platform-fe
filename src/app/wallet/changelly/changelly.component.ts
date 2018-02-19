import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ErrorMessage} from '../../shared/error-messages/error-messages';
import {Observable} from 'rxjs/Observable';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import 'rxjs/add/observable/zip';
import {WalletType} from '../../shared/local/wallet.enum';

@Component({
    selector: 'app-changelly',
    templateUrl: './changelly.component.html',
    styleUrls: ['./changelly.component.scss']
})
export class ChangellyComponent implements OnInit {

    readonly walletTypes = WalletType;
    wallets = [];
    changlyUrl: SafeUrl;
    error = '';
    showLoading = true;

    constructor(private userService: UserService, private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
        // Observable.zip(this.userService.setWallet(WalletType.Bitcoin), this.userService.setWallet(WalletType.Ethereum))
        //     .subscribe((wallets: Array<any>) => {
        //             this.wallets = wallets;
        //
        //             const bitcoinAddress = this.wallets
        //                 .filter(wallets => wallets.wallet === WalletType.Bitcoin)
        //                 .map(w => w.publicKey)[0];
        //
        //             this.changlyUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://changelly.com/widget/v1?auth=email&from=BTC&to=USD&merchant_id=e9d2f3b8d34b&address=${bitcoinAddress}&amount=&ref_id=e9d2f3b8d34b&color=3366FF`);
        //         },
        //         err => {
        //             console.error(err);
        //             const errMessage = JSON.parse(err._body).message;
        //             this.error = ErrorMessage[errMessage];
        //         });
    }

    iframeOnLoadEvent(changlyIframe) {
        if (changlyIframe.src) {
            this.showLoading = false;
        }
    }
}
