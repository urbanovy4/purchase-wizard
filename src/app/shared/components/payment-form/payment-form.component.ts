import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { CardTypes, PaymentFormValue } from '../../../core/models';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaymentFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PaymentFormComponent),
      multi: true
    }
  ]
})
export class PaymentFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public form: FormGroup;
  public cardType: CardTypes;
  private subscriptions: Subscription[] = [];

  private onChange: any = () => {
  };

  private onTouched: any = (): void => {
  };

  constructor() {
  }

  public ngOnInit(): void {
    this.initForm();

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value: PaymentFormValue) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public set value(value: PaymentFormValue) {
    this.form.setValue(<PaymentFormValue>{
      cardNumber: value.cardNumber,
      ccvCode: value.ccvCode,
      expDate: value.expDate
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16)
      ]),
      ccvCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]),
      expDate: new FormControl('', [Validators.required])
    });
  }

  private checkForCardType(cardNumber: string): void {
    if (cardNumber.startsWith('3')) this.cardType = CardTypes.AmericanExpress;
    if (cardNumber.startsWith('4')) this.cardType = CardTypes.Visa;
    if (cardNumber.startsWith('5')) this.cardType = CardTypes.MasterCard;
    if (cardNumber.startsWith('6')) this.cardType = CardTypes.Discover;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }

    if (obj === null) {
      console.log('Form has been reset');
      this.form.reset();
    }
  }

  private validate(): { payment: { valid: boolean } } | null {
    return this.form.valid ? null : {payment: {valid: false}};
  }

}
