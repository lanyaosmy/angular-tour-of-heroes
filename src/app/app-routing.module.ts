import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HerosComponent } from './modules/heros/heros.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeroDetailComponent } from './modules/hero-detail/hero-detail.component';

import { CompInteractionComponent } from './modules/comp-interaction/comp-interaction/comp-interaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HerosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'interaction', component: CompInteractionComponent },
  { path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
