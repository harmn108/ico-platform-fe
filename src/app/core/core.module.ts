import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth/auth.service';
<<<<<<< HEAD
import { CountdownComponent } from './countdown/countdown.component'
import { MatProgressSpinnerModule } from '@angular/material';
=======
import { KycComponent } from './kyc/kyc.component';
import {MatCardModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
>>>>>>> 5c598508b158776758f0404dd80f8711b8107259

@NgModule({
    imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
    ],
    declarations: [
        HeaderComponent,
        HomeComponent,
        CountdownComponent,
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
