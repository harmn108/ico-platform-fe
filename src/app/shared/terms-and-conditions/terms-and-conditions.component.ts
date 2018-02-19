import {Component, ElementRef, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.css'],
})
export class TermsAndConditionsComponent implements OnInit {

    constructor(private el: ElementRef,
                @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        // this.el.nativeElement.children[0].scollTop = 0;
    }

    scroll(target) {
        if (isPlatformBrowser(this.platformId)) {
            const element = document.getElementById(target);
            element.scrollIntoView();

            const scrolledY = window.scrollY;
            if (scrolledY) {
                window.scroll(0, scrolledY - 50);
            }
        }
    }

}
