import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'pricing', pathMatch: 'full'},
  {
    path: 'pricing',
    loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'preview',
    loadChildren: () => import('./pages/preview/preview.module').then(m => m.PreviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
