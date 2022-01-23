import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardItemComponent } from './components/cadr-item/card-item.component';
import { WizardService } from './services';
import { PipesModule } from './pipes/pipes.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { environment } from '../../environments/environment';

const components = [CardItemComponent, ProfileFormComponent, AddressFormComponent, PaymentFormComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: 'COUNTRIES_URL', useValue: environment.countriesUrl},
    WizardService
  ],
  exports: [...components, PipesModule]
})
export class SharedModule {

}
