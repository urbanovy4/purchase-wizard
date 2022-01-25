import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function creditCardValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let valueArr = String(control.value).split('').map(Number);
    let count: number = 0;
    let doubleDigit: boolean = false;
    if (valueArr.length === 16) {
      for (let i = valueArr.length - 1; i >= 0; i--) {
        let digit = +valueArr[i];
        if (doubleDigit) {
          digit *= 2;
          if (digit > 9)
            digit -= 9;
        }
        count += digit;
        doubleDigit = !doubleDigit;
      }
      if (count % 10 !== 0) {
        return {cardInvalid: count % 10 !== 0}
      } else {
        return null;
      }
    } else {
      return {
        lengthError: true
      }
    }
  }
}

export function ccvValidator(): ValidatorFn {
  return ({value}): ValidationErrors | null => {
    const valueArr = String(value).split('').map(Number);
    if (valueArr.length === 3) {
      return null;
    }
    return {
      ccvInvalid: true
    };
  }
}
