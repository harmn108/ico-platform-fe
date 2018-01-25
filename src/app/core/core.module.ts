import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth/auth.service';

@NgModule({
    imports: [
        SharedModule,
        AppRoutingModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ],
    providers: [
        AuthService
    ],
})
export class CoreModule {
}
