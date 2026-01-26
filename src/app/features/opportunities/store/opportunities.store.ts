import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FilterOpportunitiesDto } from '../dto/filter-opportunities.dto';
import { buildQueryParams } from '../../../shared/helpers';
import { IOpportunity } from '../../../shared/models';

interface IOpportunitiesStore {
  isLoading: boolean;
  opportunities: [IOpportunity[], number];
}

export const OpportunitiesStore = signalStore(
  withState<IOpportunitiesStore>({ isLoading: false, opportunities: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadOpportunities: rxMethod<FilterOpportunitiesDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get<{ data: [IOpportunity[], number] }>('opportunities', { params }).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, opportunities: data });
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
