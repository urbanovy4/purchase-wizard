import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardItem, SubscriptionType, Country, UsState, Order, PreviewData } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private selectedCardsType$: BehaviorSubject<string> = new BehaviorSubject<string>(SubscriptionType.Personal);
  public readonly selectedCardsType: Observable<string> = this.selectedCardsType$.asObservable();

  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>('Dollar');
  public readonly selectedCurrency: Observable<string> = this.selectedCurrency$.asObservable();

  private selectedSubscription$: BehaviorSubject<CardItem> = new BehaviorSubject<CardItem>(null);
  public readonly selectedSubscription: Observable<CardItem> = this.selectedSubscription$.asObservable();

  private orderData$: BehaviorSubject<Order> = new BehaviorSubject<Order>(null);
  public readonly orderData: Observable<Order> = this.orderData$.asObservable();

  private shouldShowLoader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly shouldShowLoader: Observable<boolean> = this.shouldShowLoader$.asObservable();

  private isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isCompleted: Observable<boolean> = this.isCompleted$.asObservable();

  private notifyToUnsubscribe$: Subject<null> = new Subject<null>();
  public readonly notifyToUnsubscribe: Observable<null> = this.notifyToUnsubscribe$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('COUNTRIES_URL') private readonly countriesUrl: string
  ) {
  }

  /**
   * Select wizard type
   * @param type
   */
  public selectCardsType(type: string): void {
    this.selectedCardsType$.next(type);
  }

  /**
   * Select subscription
   * @param card
   */
  public selectSubscription(card: CardItem): void {
    this.selectedSubscription$.next(card);
  }

  /**
   * Save order
   */
  public saveOrder(order: Order): void {
    this.orderData$.next(order);
  }

  /**
   * Notify to unsubscribe
   */
  public onUnsubscribe(): void {
    this.notifyToUnsubscribe$.next(null);
  }

  /**
   * Show loader
   */
  public showLoader(condition: boolean): void {
    this.shouldShowLoader$.next(condition);
  }

  /**
   * Change completion state
   * @param state
   */
  public changeCompletionState(state: boolean): void {
    this.isCompleted$.next(state);
  }

  /**
   * Get all cards by type
   */
  public getAllByType(type: string): Observable<CardItem[]> {
    return this.http.get<CardItem[]>(`api/cards/${type}`);
  }

  /**
   * Get countries
   */
  public getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl)
      .pipe(
        map((countries: Array<any>) => {
          return countries
            .map(country => ({countryName: country['altSpellings'][1]}))
            .filter(country => country.countryName)
            .sort((previous, next) => {
              if (previous.countryName.toLowerCase() > next.countryName.toLowerCase()) {
                return 1;
              }
              if (previous.countryName.toLowerCase() < next.countryName.toLowerCase()) {
                return -1;
              }
              return 0;
            });
        }),
      );
  }

  /**
   * Complete purchase
   * @param data
   */
  public completePurchase(data: PreviewData): Observable<PreviewData> {
    return this.http.post<PreviewData>('api/complete-purchase', data);
  }

  /**
   * Get us states
   */
  public getUsStates(): Observable<UsState[]> {
    return this.http.get<UsState[]>('api/us-states');
  }

  /**
   * Redirect to
   * @param url
   */
  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

}
