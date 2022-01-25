/**
 * Profile form value
 */
export interface ProfileFormValue {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

/**
 * Address form value
 */
export interface AddressFormValue {
  country: string;
  city: string;
  state?: string;
  streets: Array<string>;
  zipCode: number;
}

/**
 * Payment form value
 */
export interface PaymentFormValue {
  cardNumber: number;
  ccvCode: number;
  expDate: Date;
  cardType: CardTypes;
}

/**
 * Card types
 */
export enum CardTypes {
  Visa = 'Visa',
  MasterCard = 'MasterCard',
  Discover = 'Discover'
}

/**
 * Cards regular expressions
 */
export enum CardTypesRegExp {
  VisaRegExp = '^4[0-9]$',
  MasterCardRegExp = '^5[0-9]$',
  DiscoverRegExp = '^6[0-9]$'
}
