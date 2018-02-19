import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateComponent} from './template/template.component';
import {RouterModule} from '@angular/router';
import {CurrencyPipe} from './pipes/currency.pipe';
import {SprintfPipe} from './pipes/sprintf.pipe';
import {
  MatButtonModule, MatDialogModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSnackBarModule, MatSelectModule
} from '@angular/material';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BonusProgramComponent} from './bonus-program/bonus-program.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from "./header/header.component";
import {SubscribeComponent} from '../core/subscribe/subscribe.component';
import {FooterComponent} from '../core/footer/footer.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LinkExpiredComponent} from './link-expired/link-expired.component';
import {ConfirmDialogComponent} from './dialogs/confirm/confirm-dialog';
import {TutorialDialogComponent} from './dialogs/tutorial/tutorial-dialog.component';
import {TermsAndConditionsComponent} from './terms-and-conditions/terms-and-conditions.component';

export function exportTranslateStaticLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    BonusProgramComponent,
    PageNotFoundComponent,
    LinkExpiredComponent,
    ConfirmDialogComponent,
    TutorialDialogComponent,
    TermsAndConditionsComponent,
    // pipes
    CurrencyPipe,
    SprintfPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    FlexLayoutModule,
    TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: exportTranslateStaticLoader,
          deps: [HttpClient]
        }
      }
    )
  ],
  exports: [
    TemplateComponent,
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    BonusProgramComponent,
    // pipes
    CurrencyPipe,
    SprintfPipe,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
  ]
})
export class SharedModule {
}
