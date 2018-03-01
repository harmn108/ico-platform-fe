import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../validator/validator.service';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../../services/user.service';
import {LanguageService} from '../../services/lenguage.service';
import {ConfigService} from '../../services/config.service';
import {ErrorMessage} from '../../shared/error-messages/error-messages';
import {ConfirmDialogComponent} from '../../shared/dialogs/confirm/confirm-dialog';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit, OnDestroy {

  readonly progress = {
    color: 'primary',
    mode: 'indeterminate',
    value: 40,
    bufferValue: 10
  };
  emailForm: FormGroup;
  errorMessage = undefined;
  formSubmited = false;
  answer = false;
  currentLanguage = '';
  emailWarning;
  conditionsWarning = false;
  agreement = 0;
  checkBalance = false;
  formBuilderObject = {};
  buttonStyle = ['disabled'];
  contactUsLink = '';
  public emailSubmitSub: Subscription;

  public languageSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public dialog: MatDialog,
              private router: Router,
              public configService: ConfigService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    if (this.router.url.slice(4) === 'check-wallet') {
      this.checkBalance = true;
      this.formBuilderObject = {
        'email': new FormControl('', [Validators.required, ValidationService.emailValidator]),
      };
    } else {
      this.formBuilderObject = {
        'email': new FormControl('', [Validators.required, ValidationService.emailValidator]),
        'tac': new FormControl(false, []),
      };
    }
    this.languageSub = this.languageService.language.subscribe(lang => this.currentLanguage = lang);

    this.buildForm();
    this.emailForm.valueChanges.subscribe(data => {
      this.errorMessage = '';
      this.emailWarning = '';
      this.conditionsWarning = false;

      if (this.emailForm.valid) {
        this.buttonStyle = ['enabled'];
      } else {
        this.buttonStyle = ['disabled'];
      }
    });
  }

  buildForm(): void {
    this.emailForm = this.formBuilder.group(this.formBuilderObject);
  }

  EmailSubmit(): any {
    const input = this.emailForm.value.email;
    const validationResult = ValidationService.emailValidator({value: input});
    if (validationResult) {
      return this.emailWarning = validationResult.email;
    }

    if (!this.emailForm.value.tac && !this.checkBalance) {
      return this.conditionsWarning = true;
    } else if (this.emailForm.invalid) {
      return;
    }

    this.formSubmited = true;
    this.userService.emailSubmit(input, this.currentLanguage, this.emailForm.value.tac || this.agreement)
    this.emailSubmitSub = this.userService.emailSubmitChanged.subscribe(
      data => {
        this.answer = true;
        this.errorMessage = '';
        this.formSubmited = false;
      },
      err => {
        console.log('shift', err);
        this.formSubmited = false;
        this.emailForm.reset();
        if (err.status === 400) {
          this.errorMessage = '';
          return this.errorMessage = ErrorMessage['ico_not_started'];
        }
        if (err.status === 404) {
          return this.errorMessage = ErrorMessage['no_user'];
        }
        const errMessage = JSON.parse(err._body).message;
        if (errMessage === 'free_wallet_not_found') {
          this.contactUsLink = 'https://publiq.network/en/contacts/';
        }
        this.errorMessage = ErrorMessage[`${errMessage}`];
      }
    );
  }

  backStep(): any {
    this.answer = false;
    this.emailForm.reset();
  }

  openTac() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          showTaC: true,
          showForm: false,
          allowClose: true
        }
      }
    );
    dialogRef.disableClose = false;
  }

  ngOnDestroy() {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
    this.emailSubmitSub && this.emailSubmitSub.unsubscribe();
  }

}
