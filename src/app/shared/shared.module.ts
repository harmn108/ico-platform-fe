import {NgModule} from '@angular/core';
import {TemplateComponent} from './template/template.component';
import {HeaderComponent} from '../core/header/header.component';
import {SubscribeComponent} from '../core/subscribe/subscribe.component';
import {FooterComponent} from '../core/footer/footer.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent,
    SubscribeComponent,
    FooterComponent,
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
