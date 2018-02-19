import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-indacoin',
    templateUrl: './indacoin.component.html',
    styleUrls: ['./indacoin.component.scss']
})
export class IndacoinComponent implements OnInit {

    indacoinForm: FormGroup;
    indacoinUrl: string;
    wallet: string;
    isValidAmount = false;

    constructor(private paymentService: PaymentService, private formBuilder: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.buildForm();
        this.indacoinForm.valueChanges.subscribe(data => {
            this.isValidAmount = false;
            this.indacoinUrl = null;
            const amountInput = data.amount;
            if (/[0-9.]/.test(amountInput) && amountInput > 0) {
                this.isValidAmount = true;
            }
        });

        this.userService.setWallet('bitcoin').subscribe(res => {
            this.wallet = res.publicKey;
        });

    }

    private buildForm() {
        this.indacoinForm = this.formBuilder.group({
            'amount': new FormControl('', [Validators.required])
        });
    }

    submit() {
        const amount = this.indacoinForm.value.amount;
        this.paymentService.submitIndaCoinData(amount).subscribe(url => {
            this.indacoinUrl = url;
        });
    }

}
