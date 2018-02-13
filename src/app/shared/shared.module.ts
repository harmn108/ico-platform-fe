import {NgModule} from '@angular/core';
import {TemplateComponent} from './template/template.component';
import {HeaderComponent} from "../core/header/header.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    TemplateComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
