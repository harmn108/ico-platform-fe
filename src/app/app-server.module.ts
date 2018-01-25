import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalInterceptor } from './universal.interceptor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        NoopAnimationsModule,
        AppModule,
        ServerModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: UniversalInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppServerModule {}
