import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageService} from '../../services/lenguage.service';
import {UserService} from '../../services/user.service';
import {ErrorMessage} from '../../shared/error-messages/error-messages';
import {ValidationService} from '../validator/validator.service';
import {NotificationService} from '../../services/notification.service';
import {environment} from '../../../environments/environment';
// import {SocialService} from '../../services/social.service';
import {Router} from '@angular/router';
import {ConfigService} from '../../services/config.service';
import {Subscription} from 'rxjs/Subscription';
const copy = require('clipboard-copy');

@Component({
    selector: 'app-referral',
    templateUrl: './referral.component.html',
    styleUrls: ['./referral.component.scss']
})

export class ReferralComponent implements OnInit, OnDestroy {

    readonly progress = {
        color: 'primary',
        mode: 'indeterminate',
        value: 40,
        bufferValue: 10
    };

    emailForm: FormGroup;
    errorMessage = undefined;
    formSubmited = false;
    formBuilderObject = {};
    currentLanguage = '';
    emailNotSetWarning = false;
    answer = false;
    isLoggedIn = false;
    referralLink = '';
    buttonStyle = ['disabled'];
    emailWarning;
    bonusInfo = [];
    public languageSub: Subscription;

    private readonly icoBackendUrl = environment.ico_frontend_url + '?referral=';
    public isUserAuthenticated;

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private notificationService: NotificationService,
                private router: Router,
                private configService: ConfigService,
                private languageService: LanguageService) {

        if (this.userService.authToken) {
            this.referralLink = this.icoBackendUrl + this.userService.referralKey;
            this.isLoggedIn = true;
        }

        this.formBuilderObject = {
            'email': new FormControl('', [Validators.required, ValidationService.emailValidator]),
        };
    }

    ngOnInit() {
        this.languageSub = this.languageService.language.subscribe(lang => this.currentLanguage = lang);
        this.buildForm();
        this.emailForm.valueChanges.subscribe(data => {
            this.errorMessage = '';
            this.emailNotSetWarning = false;
            if (this.emailForm.valid) {
                this.buttonStyle = ['enabled'];
            } else {
                this.buttonStyle = ['disabled'];
            }
        });

        this.configService.get().then(config => {
                if (config.referral_bonus_percent) {
                    this.bonusInfo.push(config.referral_bonus_percent);
                }
                if (config.referral_max_bonus) {
                    this.bonusInfo.push(config.referral_max_bonus);
                }
                if (config.referral_min_amount) {
                    this.bonusInfo.push(config.referral_min_amount);
                }
            }
        );
    }

    buildForm(): void {
        this.emailForm = this.formBuilder.group(this.formBuilderObject);
    }

    ReferralEmailSubmit() {
        const input = this.emailForm.value.email;
        const validationResult = ValidationService.emailValidator({value: input});
        if (validationResult) {
            return this.emailWarning = validationResult.email;
        }

        if (this.emailForm.invalid && !this.emailForm.value.email) {
            return this.emailNotSetWarning = true;
        } else if (this.emailForm.invalid) {
            return;
        }
        this.formSubmited = true;
        this.userService.referralEmailSubmit(this.emailForm.value.email, this.currentLanguage).subscribe(
            data => {
                this.answer = true;
                this.errorMessage = '';
                this.formSubmited = false;
            },
            err => {
                this.errorMessage = ErrorMessage['system_error'];
                this.formSubmited = false;
            }
        );
    }

    referralLinkIsCopied(referralTarget) {
        copy(referralTarget.value);
        this.notificationService.success('Referral Link Copied!');
    }

    share(url: string) {
        // this.socialService.fbShare(url);
    }

    checkWallet() {
        if (this.userService.authToken) {
            this.router.navigate([`${this.currentLanguage}/profile/wallet`]);
        } else {
            this.router.navigate([`${this.currentLanguage}/check-wallet`]);
        }
    }

    ngOnDestroy() {
        if (this.languageSub) {
            this.languageSub.unsubscribe();
        }
    }
}
