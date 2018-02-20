import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageService} from '../../services/lenguage.service';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs/Subscription';
import {ValidationService} from "../validator/validator.service";
import {ErrorMessage} from "../../shared/error-messages/error-messages";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  readonly progress = {
    color: 'primary',
    mode: 'indeterminate',
    value: 40,
    bufferValue: 10
  };

  emailForm: FormGroup;
  errorMessage = undefined;
  formWarning = null;
  formSubmited = false;
  formBuilderObject = {};
  currentLanguage = '';
  emailNotSetWarning = false;
  answer = false;
  buttonStyle = ['disabled'];
  public languageSub: Subscription;

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private languageService: LanguageService) {

    this.formBuilderObject = {
      'email': new FormControl('', [Validators.required, ValidationService.emailValidator]),
    };
  }

  ngOnInit() {
    this.languageSub = this.languageService.language.subscribe(lang => this.currentLanguage = lang);

    this.buildForm();
    this.emailForm.valueChanges.subscribe(data => {
      this.errorMessage = '';
      this.formWarning = '';
      this.emailNotSetWarning = false;
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

  SubscribeEmailSubmit(): any {
    const input = this.emailForm.value.email;
    const validationResult = ValidationService.emailValidator({value: input});
    if ( validationResult ) {
      return this.formWarning = validationResult.email;
    }

    if (this.emailForm.invalid && !this.emailForm.value.email) {
      return this.emailNotSetWarning = true;
    } else if (this.emailForm.invalid) {
      return ;
    }
    this.formSubmited = true;
    this.userService.subscribeEmailSubmit(this.emailForm.value.email, this.currentLanguage).subscribe(
      data => {
        this.answer = true;
        this.errorMessage = '';
        this.emailForm.reset();
      },
      err => {
        this.errorMessage = ErrorMessage['system_error'];
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSub) {
      this.languageSub.unsubscribe();
    }
  }
}
