import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

import { WizardService } from '../../../../../shared/services';
import { AddressFormValue, Country, PaymentFormValue, ProfileFormValue, UsState } from '../../../../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public form: FormGroup;
  public countriesList: Observable<Country[]>;
  public usStates: Observable<UsState[]>;

  constructor(
    private wizardService: WizardService
  ) {
  }

  public ngOnInit(): void {
    this.onGetCountries();
    this.initForm();
  }

  private onGetCountries(): void {
    this.countriesList = this.wizardService.getCountries();
  }

  public onGetUsStates(): void {
    this.usStates = this.wizardService.getUsStates();
  }

  private initForm(): void {
    this.form = new FormGroup({
      profile: new FormControl(<ProfileFormValue>{
        name: '',
        surname: '',
        email: '',
        phone: ''
      }),
      address: new FormControl(<AddressFormValue>{
        country: '',
        city: '',
        streets: [],
        zipCode: ''
      }),
      payment: new FormControl(<PaymentFormValue>{
        cardNumber: '',
        ccvCode: null,
        expDate: null
      })
    });
  }


  public onSubmit(): void {
    //Redirect to preview page
    console.log(this.form.value);
    this.wizardService.navigateTo('');
  }
}
