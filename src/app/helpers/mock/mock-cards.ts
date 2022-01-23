import { CardItem, CardType } from '../../core/models';

export const mockCards: CardItem[] = [
  {
    id: 1,
    name: 'Base',
    price: 0,
    reasons: ['1', '2', '3'],
    type: CardType.Personal
  },
  {
    id: 2,
    name: 'Medium',
    price: 100,
    reasons: ['1', '2', '3'],
    type: CardType.Personal
  },
  {
    id: 3,
    name: 'Pro',
    price: 500,
    reasons: ['1', '2', '3'],
    type: CardType.Personal,
    bestOffer: true
  },
  {
    id: 4,
    name: 'Base Enterprise',
    price: 1000,
    reasons: ['1', '2', '3'],
    type: CardType.Enterprise
  },
  {
    id: 5,
    name: 'Medium Enterprise',
    price: 5000,
    reasons: ['1', '2', '3'],
    type: CardType.Enterprise
  },
  {
    id: 6,
    name: 'Pro Enterprise',
    price: 10000,
    reasons: ['1', '2', '3'],
    type: CardType.Enterprise,
    bestOffer: true
  }
];
