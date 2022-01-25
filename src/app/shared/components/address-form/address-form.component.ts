import {
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Country, UsState, AddressFormValue } from '../../../core/models';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    }
  ]
})
export class AddressFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public form: FormGroup;
  private subscriptions: Subscription[] = [];

  @Input('countries') public countries: Country[];
  @Input('usStates') public usStates: UsState[];
  @Output() public usStatesEvent: EventEmitter<unknown> = new EventEmitter<unknown>();

  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };

  constructor() {
  }

  public ngOnInit(): void {
    this.initForm();

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value: AddressFormValue) => {
        this.onChange(value);
        this.onTouched();
        this.addStateFormControl();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private initForm() {
    this.form = new FormGroup({
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      streets: new FormArray([
        new FormControl('', Validators.required)
      ]),
      zipCode: new FormControl('', Validators.required)
    });
  }

  public getStreetsControls(): FormArray {
    return this.form.controls['streets'] as FormArray;
  }

  public addStreet(): void {
    (<FormArray>this.form.get('streets')).push(new FormControl('', Validators.required))
  }

  public removeStreet(index: number): void {
    (<FormArray>this.form.get('streets')).removeAt(index);
  }

  public set value(value: AddressFormValue) {
    this.form.setValue(<AddressFormValue>{
      country: value.country,
      city: value.city,
      streets: value.streets,
      zipCode: value.zipCode
    })
  }

  public writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }

    if (obj === null) {
      this.form.reset();
    }
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  private addStateFormControl() {
    this.form.get('country').valueChanges
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.checkIfUSA(value);
      })
  }

  private checkIfUSA(countryName: string): void {
    if (countryName === 'USA') {
      this.form.addControl('state', new FormControl('', Validators.required));
      this.usStatesEvent.emit();
    } else {
      this.form.get('state') ? this.form.removeControl('state') : null;
    }
  }

  private validate(_: FormControl): { address: { valid: boolean } } | null {
    return this.form.valid ? null : {address: {valid: true}}
  }

}
