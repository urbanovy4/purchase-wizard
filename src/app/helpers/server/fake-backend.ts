import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { CardItem, CardType, UsState } from '../../core/models';
import { mockCards } from '../mock/mock-cards';
import { mockStates } from '../mock/mock-us-states'

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cards: CardItem[] = [];
    let states: UsState[] = [];

    return of(null).pipe(mergeMap(() => {
      if (req.url.endsWith(CardType.Personal) && req.method === 'GET') {
        cards = this.sortByType(mockCards, CardType.Personal);
        return of(new HttpResponse({status: 200, body: cards}));
      }

      if (req.url.endsWith(CardType.Enterprise) && req.method === 'GET') {
        cards = this.sortByType(mockCards, CardType.Enterprise);
        return of(new HttpResponse({status: 200, body: cards}));
      }

      if (req.url.endsWith('us-states') && req.method === 'GET') {
        states = mockStates;
        return of(new HttpResponse({status: 200, body: states}))
      }

      return next.handle(req);
    }))
  }

  private sortByType(arr: CardItem[], type: CardType): CardItem[] {
    return arr.filter(item => item.type === type);
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
