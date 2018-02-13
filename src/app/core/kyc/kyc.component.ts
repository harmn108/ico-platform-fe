import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

  kycForm = new FormGroup({
    'fullname': new FormControl('', [Validators.required]),
    'bday': new FormControl('', [Validators.required]),
    'file': new FormControl('', [Validators.required]),
    'wallets': new FormArray([new FormControl()]),
  });
  public fullname;
  public bday;
  public file;
  private errorMessages: string;
  private conditionsWarning: string;

  constructor() { }

  ngOnInit() {
    this.kycForm.valueChanges.subscribe(data => {

        console.log('valid--- ', this.kycForm.valid);

        this.errorMessages = '';
        this.conditionsWarning = '';
      },
      err => console.log(err)
    );

  }

  get wallets(): FormArray { return this.kycForm.get('wallets') as FormArray; }

  addWallet() { this.wallets.push(new FormControl()); }

}
