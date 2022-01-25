import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProfileFormValue } from '../../../core/models';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    }
  ]
})
export class ProfileFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validators {

  public form: FormGroup;
  private subscriptions: Subscription[] = [];

  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };

  constructor() {
  }

  public ngOnInit(): void {
    this.initForm();

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      ])
    });
  }

  public get value(): ProfileFormValue {
    return this.form.value;
  }

  public set value(value: ProfileFormValue) {
    this.form.setValue({
      name: value.name,
      surname: value.surname,
      email: value.email,
      phone: value.phone
    });
    this.onChange(value);
    this.onTouched();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(obj: any) {
    if (obj) {
      this.value = obj;
    }

    if (obj === null) {
      this.form.reset();
    }
  }

  private validate(_: FormControl): { profile: { valid: boolean } } | null {
    return this.form.valid ? null : {profile: {valid: false}};
  }

}
