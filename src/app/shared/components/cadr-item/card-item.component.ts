import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CardItem } from '../../../core/models';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent {
  @Input('card') card: CardItem;
  @Output() selectSubscriptionEvent: EventEmitter<CardItem> = new EventEmitter<CardItem>();

  public selectSubscription(card: CardItem): void {
    this.selectSubscriptionEvent.emit(card);
  }
}
