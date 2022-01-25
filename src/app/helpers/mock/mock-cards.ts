import { CardItem, SubscriptionType } from '../../core/models';

export const mockCards: CardItem[] = [
  {
    id: 1,
    name: 'Base',
    price: 0,
    reasons: ['50 sessions per month', '5 products limit', '1 domain'],
    type: SubscriptionType.Personal
  },
  {
    id: 2,
    name: 'Medium',
    price: 100,
    reasons: ['500 sessions per month', 'Technical support', '1 domain'],
    type: SubscriptionType.Personal
  },
  {
    id: 3,
    name: 'Pro',
    price: 500,
    reasons: ['2000 sessions per month', 'Technical support', '1 domain', 'QR codes'],
    type: SubscriptionType.Personal,
    bestOffer: true
  },
  {
    id: 4,
    name: 'Advanced',
    price: 1000,
    reasons: ['10 000 sessions per month', 'Technical support', '2 domains', '2000 sessions of AR'],
    type: SubscriptionType.Enterprise
  },
  {
    id: 5,
    name: 'Proficient',
    price: 5000,
    reasons: ['15 000 sessions per month', 'Technical support', '3 domains', '3000 sessions of AR'],
    type: SubscriptionType.Enterprise
  },
  {
    id: 6,
    name: 'Enterprise',
    price: 10000,
    reasons: ['Contact us'],
    type: SubscriptionType.Enterprise,
    bestOffer: true
  }
];
