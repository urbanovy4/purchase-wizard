import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from './pipes/pipes.module';
import { CardItemComponent } from './components/cadr-item/card-item.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PreviewLayoutComponent } from './components/preview-layout/preview-layout.component';
import { LoaderComponent } from './components/loader/loader.component';

const components = [
  CardItemComponent, ProfileFormComponent, AddressFormComponent,
  PaymentFormComponent, PreviewLayoutComponent, LoaderComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [...components, PipesModule, ]
})
export class SharedModule {
}
