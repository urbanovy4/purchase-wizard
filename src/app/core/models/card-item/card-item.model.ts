/**
 * Cart item
 */
export interface CardItem extends SubscriptionName {
  id: number;
  price: number;
  reasons: string[];
  type: SubscriptionType;
  bestOffer?: boolean;
}

/**
 * Card item type
 */
export enum SubscriptionType {
  Personal = 'Personal',
  Enterprise = 'Enterprise'
}

/**
 *  Subscription name
 */
export interface SubscriptionName {
  name: string;
}
