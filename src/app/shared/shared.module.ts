import {NgModule} from '@angular/core';
import {TemplateComponent} from './template/template.component';
import {HeaderComponent} from '../core/header/header.component';
import {SubscribeComponent} from '../core/subscribe/subscribe.component';
import {FooterComponent} from '../core/footer/footer.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {LinkExpiredComponent} from './link-expired/link-expired.component';
import {BonusProgramComponent} from './bonus-program/bonus-program.component';
import {ConfirmDialogComponent} from './dialogs/confirm/confirm-dialog';
import {TutorialDialogComponent} from './dialogs/tutorial/tutorial-dialog.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent,
    SubscribeComponent,
    FooterComponent,
    LinkExpiredComponent,
    BonusProgramComponent,
    ConfirmDialogComponent,
    TutorialDialogComponent,
    PageNotFoundComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
  ],
  exports: [
    TemplateComponent,
    HeaderComponent,
    SubscribeComponent,
    FooterComponent,
  ]
})
export class SharedModule {
}
