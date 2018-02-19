import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessage} from '../../shared/error-messages/error-messages';
import {LanguageService} from '../../services/lenguage.service';
import {MatDialog} from '@angular/material';
import {ContentService} from '../../services/content.service';
import {ConfigService} from '../../services/config.service';
import {ConfirmDialogComponent} from '../../shared/dialogs/confirm/confirm-dialog';
import {WalletType} from '../../shared/local/wallet.enum';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public walletName = WalletType;
  showLoading: boolean = null;
  readonly wallets = [
    {shortname: 'BTC', name: 'bitcoin', icon: 'icon-bitcoin'},
    {shortname: 'ETH', name: 'ethereum', icon: 'icon-etherium'},
    {shortname: 'BCH', name: 'bitcoin cash', icon: 'icon-bitcoin-cash'},
    {shortname: 'LTC', name: 'litecoin', icon: 'icon-litecoin'},
    {shortname: 'XMR', name: 'monero', icon: 'icon-monero'},
    {shortname: null, name: 'other', icon: 'icon-other'}
  ];

  error = '';
  language = '';
  agreement = 0;
  currentWallet;
  walletTotalBalance = 0;
  bitcoinBalance = 0;
  ethereumBalance = 0;
  referralUsersCount = 0;
  bonusFromReferrals = 0;
  contributionDescriptionsData;
  public languageSub: Subscription;

  constructor(public userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private contentService: ContentService,
              public configService: ConfigService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    this.languageSub = this.languageService.language.subscribe(lang => {
      this.language = lang;
      this.agreement = this.userService.agreement;
    });
    this.configService.getIcoDate().subscribe(
      data => {
        this.walletTotalBalance = this.userService.currentBalance;
        if (!this.userService.profileHashParams) {
          this.activatedRoute.params.subscribe(params => {
            if (params.code && params.code.length === 32) {
              if (!this.userService.authToken) {
                this.userService.profileHashParams = params.code;
                this.chooseWallet(params.code);
              }
            } else if (!this.userService.authToken) {
              this.error = ErrorMessage['user_not_found'];
              this.router.navigate([`${this.language}/page-not-found`]);
            }
          });
        }

        this.getContributionDescriptions();
      }
    );

    this.contentService.addHomeClassEvent$.emit('profile-body');
    this.error = '';
  }

  ngOnDestroy() {
    this.contentService.addHomeClassEvent$.emit('');
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
  }

  getContributionDescriptions() {
    this.contentService.getWalletContent(this.languageService.language.value).subscribe(
      data => {
        if (data) {
          this.contributionDescriptionsData = data.walletContributionDescription;
        }
      },
      err => console.error(err)
    );
  }

  getReferralData() {
    this.userService.getReferralInfo().subscribe(
      data => {
        if (data) {
          const result = data;
          this.referralUsersCount = result.referralUsersCount;
          this.bonusFromReferrals = result.bonusFromReferrals;
        }
      },
      err => {
        // const errMessage = JSON.parse(err._body || err).message;
        this.error = ErrorMessage[err];
      }
    );
  }

  setWallet(index: number): any {
    this.currentWallet = this.wallets[index].name;
  }

  private chooseWallet(code) {
    this.showLoading = true;
    this.userService.getApiKey(code)
      .subscribe(walletinfo => {
          if (!walletinfo.hasSubmittedKyc) {
            this.router.navigate([`${this.language}/kyc`]);
            return;
          }
          this.agreement = walletinfo.agreement;
          this.walletTotalBalance = walletinfo.balance;
          this.bitcoinBalance = walletinfo.balance_bitcoin || 0;
          this.ethereumBalance = walletinfo.balance_ethereum || 0;

          if (!this.agreement) {
            this.openDialog();
          }
          this.getReferralData();
        },
        err => {
          console.error(err);
          const errMessage = JSON.parse(err._body).message;
          if (errMessage === 'user_not_found') {
            this.error = ErrorMessage['link_expired'];
            this.router.navigate([`${this.language}/link-expired`]);
          }

        },
        () => {
          this.showLoading = false;
        });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      this.userService.confirmAgreement().subscribe(
        agreement => this.agreement = agreement
      );
    });
  }
}
