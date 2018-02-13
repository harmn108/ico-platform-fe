import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  @Input() beFirstHidden = false;

  readonly progress = {
    color: 'primary',
    mode: 'indeterminate',
    value: 40,
    bufferValue: 10
  };

  emailForm: FormGroup;
  errorMessage = undefined;
  formWarning = '';
  formSubmited = false;
  formBuilderObject = {};
  currentLanguage = '';
  emailNotSetWarning = false;
  answer = false;
  buttonStyle = ['disabled'];

  constructor() { }

  ngOnInit() {
  }

}
