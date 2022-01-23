export interface ProfileFormValue {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface AddressFormValue {
  country: string;
  city: string;
  state?: string;
  streets: Array<string>;
  zipCode: string;
}

export interface PaymentFormValue {
  cardNumber: string;
  ccvCode: number;
  expDate: Date;
}

export enum CardTypes {
  Visa = 'Visa',
  MasterCard = 'MasterCard',
  AmericanExpress = 'American Express',
  Discover = 'Discover'
}
