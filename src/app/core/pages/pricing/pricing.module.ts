import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './components/pricing/pricing.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule,
    SharedModule
  ]
})
export class PricingModule { }
