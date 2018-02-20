import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

export interface PaxRateData {
    price: number;
    currency: string;
}

@Component({
    selector: 'app-paxful',
    templateUrl: './paxful.component.html',
    styleUrls: ['./paxful.component.scss']
})
export class PaxfulComponent implements OnInit {

    paxfulForm: FormGroup;
    paxfulUrl: string;
    wallet: string;
    isValidAmount = false;

    constructor(private paymentService: PaymentService, private formBuilder: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.buildForm();
        this.paxfulForm.valueChanges.subscribe(data => {
            this.isValidAmount = false;
            this.paxfulUrl = null;
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
        this.paxfulForm = this.formBuilder.group({
            'amount': new FormControl('', [Validators.required])
        });
    }

    submit() {
        const amount = this.paxfulForm.value.amount;
        this.paymentService.submitPaxFulData(amount).subscribe(url => {
            this.paxfulUrl = url;
        });
    }

}
