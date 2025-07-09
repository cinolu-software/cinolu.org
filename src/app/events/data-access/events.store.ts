import { signalStore, withState, withMethods, patchState, withProps, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IEvent } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { ActivatedRoute } from '@angular/router';

interface IEventsStore {
  isLoading: boolean;
  events: [IEvent[], number];
}

export const EventsStore = signalStore(
  withState<IEventsStore>({ isLoading: false, events: [[], 0] }),
  withProps(() => ({
    _route: inject(ActivatedRoute),
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadEvents: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return _http
            .get<{ data: [IEvent[], number] }>('events/find-published', {
              params: buildQueryParams(params)
            })
            .pipe(
              tap(({ data }) => patchState(store, { isLoading: false, events: data })),
              catchError(() => {
                patchState(store, { isLoading: false, events: [[], 0] });
                return of(null);
              })
            );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ _route, loadEvents }) => {
      const queryParams = {
        page: Number(_route.snapshot.queryParams?.['page']) || null,
        categories: _route.snapshot.queryParams?.['categories'] || null
      };
      loadEvents(queryParams);
    }
  })
);
