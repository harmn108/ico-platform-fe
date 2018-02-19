import {Component, OnInit} from '@angular/core';
import {Broadcaster} from '../broadcaster/broadcaster';
import {LanguageService} from '../../services/lenguage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

    constructor(private broadcaster: Broadcaster,
                private router: Router,
                private languageService: LanguageService) {

    }

    ngOnInit() {
        this.broadcaster.broadcast('showHeader', false);
        this.broadcaster.broadcast('showFooter', false);
    }

    goHome() {
        this.router.navigate([`${this.languageService.language.value}/`]);
    }

}
