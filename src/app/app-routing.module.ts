import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {KycComponent} from './core/kyc/kyc.component';
import {TemplateComponent} from './shared/template/template.component';
import {LanguageGuard} from './shared/guards/language/language.guard';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'en',
    },
    {
      path: ':language',
      component: TemplateComponent,
      canActivate: [LanguageGuard],
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: HomeComponent
        },
        {
          path: 'kyc',
          pathMatch: 'full',
          component: KycComponent
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'en/page-not-found'
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
