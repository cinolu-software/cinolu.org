import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IOpportunity } from '../../../shared/models/entities.models';

interface IOpportunityStore {
  isLoading: boolean;
  opportunity: IOpportunity | null;
}

export const OpportunityStore = signalStore(
  withState<IOpportunityStore>({ isLoading: false, opportunity: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadOpportunity: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return _http.get<{ data: IOpportunity }>(`opportunities/slug/${slug}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, opportunity: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);
