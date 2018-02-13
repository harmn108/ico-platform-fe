import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {CountdownComponent} from './core/countdown/countdown.component';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: CountdownComponent
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
