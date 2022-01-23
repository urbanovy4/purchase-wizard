/**
 * Cart item
 */
export interface CardItem extends SubscriptionName {
  id: number;
  price: number;
  reasons: string[];
  type: CardType;
  bestOffer?: boolean;
}

/**
 * Card item type
 */
export enum CardType {
  Personal = 'Personal',
  Enterprise = 'Enterprise'
}

/**
 *  Subscription name
 */
export interface SubscriptionName {
  name: string;
}
