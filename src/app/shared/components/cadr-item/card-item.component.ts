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
  @Output() selectSubscription: EventEmitter<number> = new EventEmitter<number>();
}
