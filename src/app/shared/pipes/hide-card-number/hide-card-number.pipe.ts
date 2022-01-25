import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCardNumber'
})
export class HideCardNumberPipe implements PipeTransform {

  public transform(value: number, count: number): string {
    const cardNumber: string = String(value);
    return cardNumber
      .slice(-count)
      .padStart(cardNumber.length, '*');
  }

}
