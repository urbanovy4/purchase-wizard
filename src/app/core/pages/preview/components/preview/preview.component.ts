import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { WizardService } from '../../../../../shared/services';
import { CardItem, Order, PreviewData } from '../../../../models';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  public previewData: Observable<PreviewData>;
  public currency: Observable<string>;
  public shouldShowLoader: Observable<boolean>;

  constructor(
    private wizardService: WizardService,
  ) {
  }

  public ngOnInit(): void {
    this.onGetPreviewData();
    this.onGetCurrency();
    this.checkForRedirect();
    this.onGetLoaderFlag();
  }

  public ngOnDestroy(): void {
    this.wizardService.onUnsubscribe();
  }

  public onGetLoaderFlag(): void {
    this.shouldShowLoader = this.wizardService.shouldShowLoader;
  }

  public completePurchase(): void {
    this.previewData
      .pipe(
        tap(() => this.wizardService.showLoader(true)),
        delay(10000),
        switchMap((data: PreviewData) => this.wizardService.completePurchase(data)),
        takeUntil(this.wizardService.notifyToUnsubscribe)
      )
      .subscribe(() => {
        this.wizardService.showLoader(false);
        this.wizardService.changeCompletionState(true);
        this.wizardService.navigateTo('/complete');
      })
  }

  private onGetCurrency(): void {
    this.currency = this.wizardService.selectedCurrency;
  }

  private onGetPreviewData(): void {
    this.previewData = this.wizardService.orderData
      .pipe(
        switchMap((order: Order) => this.wizardService.selectedSubscription
          .pipe(
            map((card: CardItem) => {
              if (card) {
                return <PreviewData>{
                  subscriptionName: card.name,
                  cardNumber: order.payment.cardNumber,
                  cardType: order.payment.cardType,
                  price: card.price,
                }
              }
              return null;
            })
          )
        )
      );
  }

  private checkForRedirect(): void {
    this.previewData
      .pipe(
        takeUntil(this.wizardService.notifyToUnsubscribe)
      )
      .subscribe(value => {
        if (!value) {
          this.wizardService.navigateTo('/pricing')
        }
      });
  }

}
