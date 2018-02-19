import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-payment-systems',
    templateUrl: './payment-systems.component.html',
    styleUrls: ['./payment-systems.component.scss']
})
export class PaymentSystemsComponent implements OnInit {

    paymentSystems: Array<string> = ['indacoin', 'changelly'];
    currentPaymentSystem = 'indacoin';

    constructor() {
    }

    ngOnInit() {
    }

    setMethod(method) {
        this.currentPaymentSystem = method;
    }
}
