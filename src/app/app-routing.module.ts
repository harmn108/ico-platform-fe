import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountdownComponent} from './core/countdown/countdown.component';
import {TemplateComponent} from './shared/template/template.component';
import {LanguageGuard} from './shared/guards/language/language.guard';
import {ContributeComponent} from './core/contribute/contribute.component';
import {ReferralComponent} from './core/referral/referral.component';
import {HomepageComponent} from './core/homepage/homepage.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LinkExpiredComponent} from './shared/link-expired/link-expired.component';
import {AuthGuard} from './shared/guards/auth/auth.guard';
import {KycComponent} from "./core/kyc/kyc.component";

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
          component: HomepageComponent,
          children: [
            {
              path: '',
              pathMatch: 'full',
              component: CountdownComponent
            },
            {
              path: 'check-wallet',
              pathMatch: 'full',
              component: ContributeComponent,
            },
            {
              path: 'referral',
              pathMatch: 'full',
              component: ReferralComponent,
            },
            {
              path: 'contribute',
              pathMatch: 'full',
              component: ContributeComponent,
              canActivate: [AuthGuard]
            },
            {
              path: 'page-not-found',
              pathMatch: 'full',
              component: PageNotFoundComponent
            },
            {
              path: 'link-expired',
              pathMatch: 'full',
              component: LinkExpiredComponent
            },
            {
              path: 'kyc',
              pathMatch: 'full',
              component: KycComponent
            },
            {   path: 'profile',
              loadChildren: './wallet/wallet.module#WalletModule'
            }
          ]
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

