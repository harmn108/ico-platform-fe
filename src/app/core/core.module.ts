import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth/auth.service';
import {CountdownComponent} from './countdown/countdown.component';
import {KycComponent} from './kyc/kyc.component';
import {MatProgressSpinnerModule, MatCardModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        BrowserModule,
        FormsModule,
    ],
    declarations: [
        HomeComponent,
        CountdownComponent,
        KycComponent,
    ],
    exports: [
        AppRoutingModule
    ],
    providers: [
        AuthService
    ],
})
export class CoreModule {
}
