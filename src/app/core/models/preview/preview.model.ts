import { CardTypes } from '../forms/forms.model';

export interface PreviewData {
  subscriptionName: string;
  price: number;
  cardType: CardTypes
  cardNumber: number;
}
