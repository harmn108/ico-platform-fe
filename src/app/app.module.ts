import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './services/user.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ClickOutsideModule} from 'ng-click-outside';
import {ApiService} from './services/api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageService} from './services/lenguage.service';
import {ChartsModule} from 'ng2-charts';
import {NotificationService} from './services/notification.service';
import {ConfigService} from './services/config.service';
import {ContentService} from './services/content.service';
// import {SocialService} from './services/social.service';
// import {FacebookService} from 'ngx-facebook';
import {SharedModule} from './shared/shared.module';
import {MatSnackBar} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LanguageGuard} from './shared/guards/language/language.guard';
import {ProfileGuard} from './shared/guards/profile-guard/profile.guard';
import {AuthGuard} from './shared/guards/auth/auth.guard';
import {PaymentService} from './services/payment.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TutorialDialogComponent} from './shared/dialogs/tutorial/tutorial-dialog.component';
import {WindowRefService} from './core/homepage/homepage.component';
import {ConfirmDialogComponent} from './shared/dialogs/confirm/confirm-dialog';
import {ValidationService} from './core/validator/validator.service';
import {Broadcaster} from './shared/broadcaster/broadcaster';
import {HttpCacheService} from './http-cache.service';
import {CachingInterceptor} from './caching-interceptor.service';
import {WalletModule} from './wallet/wallet.module';
import {CoreModule} from './core/core.module';
import {ErrorService} from './services/error.service';

export function exportTranslateStaticLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    ClickOutsideModule,
    ChartsModule,
    SharedModule,
    // BrowserModule,
    HttpClientModule,
    CoreModule,
    WalletModule,
    MatCardModule,
    MatIconModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: exportTranslateStaticLoader,
          deps: [HttpClient]
        }
      }
    )
  ],
  entryComponents: [ConfirmDialogComponent, TutorialDialogComponent],
  providers: [
    ValidationService,
    UserService,
    ApiService,
    LanguageService,
    NotificationService,
    ConfigService,
    ContentService,
    // SocialService,
    Broadcaster,
    WindowRefService,
    PaymentService,
    ProfileGuard,
    AuthGuard,
    LanguageGuard,
    // PreIcoGuard,
    HttpClient,
    MatSnackBar,
    HttpCacheService,
    ErrorService,
    // FacebookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true,
    }
  ],
  exports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
