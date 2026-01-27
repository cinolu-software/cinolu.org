import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IOpportunity } from '../../../shared/models';

interface IUserOpportunitiesStore {
  isLoading: boolean;
  opportunities: [IOpportunity[], number];
}

export const UserOpportunitiesStore = signalStore(
  withState<IUserOpportunitiesStore>({ isLoading: false, opportunities: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadOpportunitiesForUser: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.get<{ data: [IOpportunity[], number] }>('opportunities/for-me').pipe(
            tap(({ data }) => {
              const opportunities = Array.isArray(data[0]) ? data[0] : [];
              const count = data[1] || 0;

              patchState(store, { isLoading: false, opportunities: [opportunities, count] });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, opportunities: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);
