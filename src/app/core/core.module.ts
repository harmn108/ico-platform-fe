import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth/auth.service';
import { KycComponent } from './kyc/kyc.component';
import {MatCardModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
    ],
    declarations: [
        HomeComponent,
        KycComponent
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
