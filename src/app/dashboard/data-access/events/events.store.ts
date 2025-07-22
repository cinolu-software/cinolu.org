import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IProgram } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../../utils/types/query-params.type';
import { buildQueryParams } from '../../../shared/utils/helpers/build-query-params.fn';

interface IEventsStore {
  isLoading: boolean;
  isFiltering: boolean;
  events: [IProgram[], number];
}

export const EventsStore = signalStore(
  withState<IEventsStore>({ isLoading: false, isFiltering: false, events: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadEvents: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IProgram[], number] }>('events', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, events: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, events: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);
