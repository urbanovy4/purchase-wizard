import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { WizardService } from '../../../../../shared/services';
import { AddressFormValue, Country, PaymentFormValue, ProfileFormValue, UsState } from '../../../../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

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
    this.checkForRedirect();
  }

  public ngOnDestroy(): void {
    this.wizardService.onUnsubscribe();
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
        streets: [''],
        zipCode: null
      }),
      payment: new FormControl(<PaymentFormValue>{
        cardNumber: null,
        ccvCode: null,
        expDate: null,
        cardType: null
      })
    });
  }


  public onSubmit(): void {
    console.log(this.form.value)
    this.wizardService.saveOrder(this.form.value);
    this.wizardService.navigateTo('/preview');
  }

  private checkForRedirect(): void {
    this.wizardService.selectedSubscription
      .pipe(
        takeUntil(this.wizardService.notifyToUnsubscribe)
      )
      .subscribe(selectedSub => {
        if (!selectedSub) {
          this.wizardService.navigateTo('/pricing');
        }
      })
  }
}
