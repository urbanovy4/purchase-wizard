import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PreviewData } from '../../../core/models';

@Component({
  selector: 'app-preview-layout',
  templateUrl: './preview-layout.component.html',
  styleUrls: ['./preview-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewLayoutComponent {

  @Input('previewData') previewData: PreviewData;
  @Input('currency') currency: string;
  @Output() completePurchaseEvent: EventEmitter<void> = new EventEmitter<void>();

}
