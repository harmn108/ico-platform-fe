// system modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
// custom modules
// integrated modules
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// services
// components
import {AppComponent} from './app.component';
// directives
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {LanguageGuard} from "./shared/guards/language/language.guard";

// configuration
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'arc-work'}),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    LanguageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
