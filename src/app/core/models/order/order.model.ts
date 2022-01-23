import { AddressFormValue, PaymentFormValue, ProfileFormValue } from '../forms/forms.model';

export interface Order {
  address: AddressFormValue;
  payment: PaymentFormValue;
  profile: ProfileFormValue;
}
