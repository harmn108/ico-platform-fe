import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {WalletComponent} from "./wallet/wallet.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileGuard} from "../shared/guards/profile-guard/profile.guard";
import {IndacoinComponent} from "./indacoin/indacoin.component";
import {PaymentSystemsComponent} from "./payment-systems/payment-systems.component";
import {PaxfulComponent} from "./paxful/paxful.component";
import {ChangellyComponent} from "./changelly/changelly.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {TransfersComponent} from "./transfers/transfers.component";
import {KycComponent} from "./kyc/kyc.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
        {
          path: "",
          children: [
            {
              path: "kyc",
              pathMatch: "full",
              component: KycComponent,
              canActivate: [ProfileGuard]
            },
            {
              path: "wallet",
              pathMatch: "full",
              component: ProfileComponent,
              canActivate: [ProfileGuard]
            },
            {
              path: ":code",
              pathMatch: "full",
              component: ProfileComponent
            }
          ]
        }
      ],
    )
  ],
  declarations: [
    WalletComponent,
    ProfileComponent,
    ChangellyComponent,
    PaxfulComponent,
    PaymentSystemsComponent,
    IndacoinComponent,
    CalculatorComponent,
    KycComponent,
    TransfersComponent
  ],
  providers: [],
  exports: [
    ChangellyComponent,
    PaxfulComponent,
    PaymentSystemsComponent,
    IndacoinComponent,
    CalculatorComponent,
    TransfersComponent
  ]
})
export class WalletModule {
}

