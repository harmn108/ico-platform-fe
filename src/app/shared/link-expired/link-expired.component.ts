import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LanguageService} from '../../services/lenguage.service';
import {Broadcaster} from '../broadcaster/broadcaster';

@Component({
    selector: 'app-link-expired',
    templateUrl: './link-expired.component.html',
    styleUrls: ['./link-expired.component.scss']
})
export class LinkExpiredComponent implements OnInit {

    constructor(private broadcaster: Broadcaster,
                private router: Router,
                private languageService: LanguageService) {
    }

    ngOnInit() {
        this.broadcaster.broadcast('showHeader', false);
        this.broadcaster.broadcast('showFooter', false);
    }

    checkWallet() {
        this.router.navigate([`${this.languageService.language.value}/check-wallet`]);
    }

}
