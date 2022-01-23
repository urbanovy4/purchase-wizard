import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { WizardService } from '../../../../../shared/services';
import { CardItem, CardType } from '../../../../models';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {

  public selectedCardType: Observable<string>;
  public cardTypes = CardType;

  constructor(
    private wizardService: WizardService
  ) {
  }

  public ngOnInit(): void {
    this.selectedCardType = this.wizardService.selectedCardsType;
  }

  public ngOnDestroy(): void {
    this.wizardService.onUnsubscribe();
  }

  public selectCardsType(type: string): void {
    this.wizardService.selectCardsType(type);
  }

  public getCards(): Observable<CardItem[]> {
    return this.selectedCardType
      .pipe(
        switchMap(type => this.wizardService.getAllByType(type)),
        takeUntil(this.wizardService.notifyToUnsubscribe)
      );
  }

  public selectSubscription(id: number): void {
    this.wizardService.selectSubscription(id);
    this.wizardService.navigateTo('/order')
  }

}
