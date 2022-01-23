import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardItem, CardType, Country, UsState } from '../../../core/models';

@Injectable()
export class WizardService {
  private _selectedCardsType$: BehaviorSubject<string> = new BehaviorSubject<string>(CardType.Personal);
  public readonly selectedCardsType: Observable<string> = this._selectedCardsType$.asObservable();

  private _selectedSubscription$: Subject<number> = new Subject<number>();
  public readonly selectedSubscription: Observable<number> = this._selectedSubscription$.asObservable();

  private _notifyToUnsubscribe$: Subject<null> = new Subject<null>();
  public readonly notifyToUnsubscribe: Observable<null> = this._notifyToUnsubscribe$.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    @Inject('COUNTRIES_URL') private readonly countriesUrl: string
  ) {
  }

  /**
   * Get all cards by type
   */
  public getAllByType(type: string): Observable<CardItem[]> {
    return this._http.get<CardItem[]>(`api/cards/${type}`);
  }

  /**
   * Select wizard type
   * @param type
   */
  public selectCardsType(type: string): void {
    this._selectedCardsType$.next(type);
  }

  /**
   * Select subscription
   * @param id
   */
  public selectSubscription(id: number): void {
    this._selectedSubscription$.next(id);
  }

  /**
   * Get countries
   */
  public getCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(this.countriesUrl)
      .pipe(
        map((countries: Array<any>) => {
          return countries
            .map(country => ({countryName: country['altSpellings'][1]}))
            .filter(country => country.countryName)
            .sort((a, b) => {
              if (a.countryName.toLowerCase() > b.countryName.toLowerCase()) {
                return 1;
              }
              if (a.countryName.toLowerCase() < b.countryName.toLowerCase()) {
               return -1;
              }
              return 0;
            });
        }),
      );
  }

  /**
   * Get us states
   */
  public getUsStates(): Observable<UsState[]> {
    return this._http.get<UsState[]>('api/us-states');
  }

  /**
   * Redirect to
   * @param url
   */
  public navigateTo(url: string) {
    this._router.navigate([url]);
  }

  /**
   * Notify to unsubscribe
   */
  public onUnsubscribe(): void {
    this._notifyToUnsubscribe$.next(null);
  }

}
