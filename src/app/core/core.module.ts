import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule, DatePipe} from "@angular/common";
import {CountdownComponent} from './countdown/countdown.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimelineComponent} from './timeline/timeline.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ContributeComponent} from './contribute/contribute.component';
import {ReferralComponent} from './referral/referral.component';
import {SwiperModule} from 'angular2-useful-swiper';
import {FoundationComponent} from './foundation/foundation.component';
import {ChartComponent} from './chart/chart.component';
import {ContributeBarComponent} from './contribute-bar/contribute-bar.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  declarations: [
    HomeComponent,
    HomeComponent,
    CountdownComponent,
    TimelineComponent,
    HomepageComponent,
    ContributeComponent,
    ContributeBarComponent,
    ReferralComponent,
    FoundationComponent,
    ChartComponent
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    DatePipe
  ]
})
export class CoreModule {
}
